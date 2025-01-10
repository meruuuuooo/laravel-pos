<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SalesDetail;
use App\Models\Category;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Retrieve the date range from the request or set defaults
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        // Fetch sales data within the date range
        $sales = Sale::with([
            'user:id,name',
            'salesDetails' => function ($query) {
                $query->with(['product' => function ($query) {
                    $query->select('id', 'name')->withTrashed(); // Include soft-deleted products
                }]);
            },
        ])
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->orderBy('sale_date', 'desc')
            ->get()
            ->map(function ($sale) {
                return [
                    'sale_id' => $sale->id,
                    'sale_date' => Carbon::parse($sale->sale_date)->format('Y-m-d'),
                    'processed_by' => $sale->user->name,
                    'products' => $sale->salesDetails->map(function ($detail) {
                        return [
                            'product_name' => $detail->product->name ?? '[Deleted Product]',
                            'quantity_sold' => $detail->quantity_sold,
                            'line_total' => $detail->line_total,
                        ];
                    }),
                    'total_sale_amount' => $sale->total_amount,
                ];
            });

        $totalSalesAmount = Sale::whereBetween('sale_date', [$startDate, $endDate])->sum('total_amount');

        // Fetch and aggregate best-selling products
        $topProducts = Sale::with([
            'salesDetails.product' => function ($query) {
                $query->withTrashed(); // Include soft-deleted products
            },
            'salesDetails.product.category',
        ])
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->get()
            ->flatMap(function ($sale) {
                return $sale->salesDetails->map(function ($detail) {
                    return [
                        'product_name' => $detail->product->name ?? '[Deleted Product]',
                        'category_name' => $detail->product->category->name ?? 'Uncategorized',
                        'quantity_sold' => $detail->quantity_sold,
                        'line_total' => $detail->line_total,
                    ];
                });
            })
            ->groupBy('product_name')
            ->map(function ($productSales, $productName) {
                $categoryName = $productSales->first()['category_name'];
                return [
                    'product_name' => $productName,
                    'category_name' => $categoryName,
                    'total_quantity_sold' => $productSales->sum('quantity_sold'),
                    'total_revenue' => $productSales->sum('line_total'),
                ];
            })
            ->sortByDesc('total_quantity_sold')
            ->values()
            ->take(10) // Top 10 products
            ->map(function ($product, $index) {
                return array_merge($product, ['rank' => $index + 1]);
            });

        // Pass data to the view
        return Inertia::render('Sales/Index', [
            'sales' => $sales,
            'topProducts' => $topProducts,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'totalSalesAmount' => $totalSalesAmount,
        ]);
    }
}
