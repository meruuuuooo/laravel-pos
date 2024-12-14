<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\Sale;
use App\Models\SalesDetail;


class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->input('period', 'daily'); // Default to daily

        // Define the period format for SQLite
        switch ($period) {
            case 'monthly':
                $format = '%Y-%m';
                break;
            case 'weekly':
                $format = '%Y-%W'; // Week of the year
                break;
            case 'yearly':
                $format = '%Y';
                break;
            default: // dail
                $format = '%Y-%m-%d';
        }

        // Group sales data by the selected period
        $salesData = Sale::selectRaw("strftime('$format', sale_date) as period, SUM(total_amount) as total_sales")
            ->groupBy('period')
            ->orderBy('period')
            ->get();

        $totalSales = Sale::sum('total_amount');
        $totalInventories = Inventory::sum('quantity');
        $totalProduct = Product::count();
        $totalCategory = Category::count();

        // $logs = Sale::with('salesDetails.product', 'user')
        //     ->orderBy('sale_date', 'desc')
        //     ->paginate(5); // Use paginate instead of limit

        // $logs = SalesDetail::with('product', 'sale.user')
        //     ->orderBy('created_at', 'desc')
        //     ->paginate(3);

        $logs = Sale::with(['salesDetails.product', 'salesDetails.paymentMethod', 'user'])
            ->withCount('salesDetails')
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->through(function ($sale) {
                return [
                    'id' => $sale->id,
                    'cashier' => $sale->user->name ?? 'N/A', // Cashier's name (user)
                    'products_sold' => $sale->sales_details_count, // Count of products sold
                    'total_amount' => $sale->salesDetails->sum('line_total'), // Sum of line totals
                    'sold_at' => $sale->created_at, // Sale creation date and time
                    'payment_method' => $sale->salesDetails->first()?->paymentMethod->name ?? 'N/A', // First payment method used
                    'customer_number' => $sale->salesDetails->first()?->phone_number ?? 'N/A', // First customer number
                    'payment_amount' => $sale->salesDetails->first()?->payment_amount ?? 0, // First payment amount
                    'products' => $sale->salesDetails->map(function ($detail) {
                        return [
                            'name' => $detail->product->name ?? 'Unknown Product',
                            'imageURL' => $detail->product->imageURL ?? '/placeholder.jpg', // Default placeholder if no image
                            'quantity' => $detail->quantity_sold ?? 1, // Product quantity, fallback to 1 if missing
                            'price' => $detail->product->price ?? 0, // Product price (from product relation)
                            'line_total' => $detail->line_total, // Total for the item (quantity * price)
                        ];
                    }),
                ];
            });

        $lowStockProducts = Inventory::with('product:id,name,imageURL')
            ->where('quantity', '<=', 5)
            ->get(['id', 'product_id', 'quantity']);



        return Inertia::render('Dashboard', [
            'totalSales' => $totalSales,
            'totalInventories' => $totalInventories,
            'totalProduct' => $totalProduct,
            'totalCategory' => $totalCategory,
            'salesData' => $salesData,
            'logs' => $logs,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}
