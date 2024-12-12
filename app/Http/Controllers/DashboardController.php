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

        $logs = SalesDetail::with('product', 'sale.user')
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Dashboard', [
            'totalSales' => $totalSales,
            'totalInventories' => $totalInventories,
            'totalProduct' => $totalProduct,
            'totalCategory' => $totalCategory,
            'salesData' => $salesData,
            'logs' => $logs
        ]);
    }
}
