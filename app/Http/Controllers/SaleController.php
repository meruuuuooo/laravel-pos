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
        // Get the start_date and end_date from the request or set defaults
        $startDate = $request->input('start_date', now()->startOfYear()->toDateString()); // Default start to the beginning of the year
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString()); // Default end to the current month

        // Fetch sales within the date range
        $salesSummary = Sale::with([
            'salesDetails.product:id,name,category_id',
            'salesDetails.product.category:id,name'
        ])
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->get()
            ->groupBy(function ($sale) {
                return Carbon::parse($sale->sale_date)->format('Y-m'); // Group by month and year
            })
            ->map(function ($monthlySales, $monthYear) {
                $totalSales = $monthlySales->sum('total_amount');

                // Group sales by category and sum up the sales
                $salesByCategory = $monthlySales->flatMap(function ($sale) {
                    return $sale->salesDetails->map(function ($detail) {
                        return [
                            'category_name' => $detail->product->category->name,
                            'line_total' => $detail->line_total,
                        ];
                    });
                })
                    ->groupBy('category_name')
                    ->map(fn($categorySales) => $categorySales->sum('line_total'))
                    ->filter(fn($totalSales) => $totalSales > 0); // Exclude categories with zero sales

                $topSellingProducts = $monthlySales->flatMap(function ($sale) {
                    return $sale->salesDetails->map(function ($detail) {
                        return [
                            'product_name' => $detail->product->name,
                            'quantity_sold' => $detail->quantity_sold,
                        ];
                    });
                })
                    // Sort globally by quantity sold in descending order
                    ->sortByDesc('quantity_sold')
                    ->take(3) // Take only the top 3 products
                    ->pluck('product_name'); // Extract product names only


                $salesTransactions = $monthlySales->count();

                return [
                    'date_range' => [
                        'start' => Carbon::parse($monthlySales->first()->sale_date)->startOfMonth()->toDateString(),
                        'end' => Carbon::parse($monthlySales->first()->sale_date)->endOfMonth()->toDateString(),
                    ],
                    'total_sales' => $totalSales,
                    'sales_by_category' => $salesByCategory,
                    'top_selling_products' => $topSellingProducts,
                    'sales_transactions' => $salesTransactions,
                ];
            });

        // Today's and yesterday's sales data
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $todaysSales = Sale::whereDate('sale_date', $today)->sum('total_amount');
        $yesterdaysSales = Sale::whereDate('sale_date', $yesterday)->sum('total_amount');

        // Fetch product sales for today and yesterday
        $productTodaysSales = SalesDetail::whereDate('created_at', $today)
            ->with('product:id,name')
            ->select('product_id', DB::raw('SUM(quantity_sold) as total_sold'))
            ->groupBy('product_id')
            ->get()
            ->keyBy('product_id');

        $productYesterdaysSales = SalesDetail::whereDate('created_at', $yesterday)
            ->with('product:id,name')
            ->select('product_id', DB::raw('SUM(quantity_sold) as total_sold'))
            ->groupBy('product_id')
            ->get()
            ->keyBy('product_id');

        // Sales comparison of products for today and yesterday
        $productSalesComparison = Product::all()->map(function ($product) use ($productTodaysSales, $productYesterdaysSales) {
            return [
                'product_name' => $product->name,
                'today' => $productTodaysSales->get($product->id)->total_sold ?? 0,
                'yesterday' => $productYesterdaysSales->get($product->id)->total_sold ?? 0,
            ];
        });

        return Inertia::render('Sales/Index', [
            'sales' => $salesSummary, // Now includes sales grouped by all months in the range
            'startDate' => $startDate,
            'endDate' => $endDate,
            'today' => $todaysSales,
            'yesterday' => $yesterdaysSales,
            'productSalesComparison' => $productSalesComparison,
        ]);
    }

    public function salesReport(Request $request)
    {
        // Retrieve the date range from the request or set defaults
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        // Fetch sales data within the date range
        $sales = Sale::with([
            'user:id,name',
            'salesDetails.product:id,name',
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
                            'product_name' => $detail->product->name,
                            'quantity_sold' => $detail->quantity_sold,
                            'line_total' => $detail->line_total,
                        ];
                    }),
                    'total_sale_amount' => $sale->total_amount,
                ];
            });

        $totalSalesAmount = Sale::whereBetween('sale_date', [$startDate, $endDate])->sum('total_amount');

        // Pass data to the view
        return Inertia::render('Sales/Reports/SalesReport', [
            'sales' => $sales,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'totalSalesAmount' => $totalSalesAmount,
        ]);
    }

    public function BestSellingProducts(Request $request)
    {
        // Retrieve the date range from the request or set defaults
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        // Fetch and aggregate best-selling products
        $sales = Sale::with(['salesDetails.product.category'])
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->get()
            ->flatMap(function ($sale) {
                return $sale->salesDetails->map(function ($detail) {
                    return [
                        'product_name' => $detail->product->name,
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

        // Return data to the view
        return Inertia::render('Sales/Reports/BestSellingProducts', [
            'sales' => $sales,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
