<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with('category', 'inventory');

        // Filter by search query if provided
        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        }

        $products = $query->paginate(5);

        $lowStockQuery = Product::with('inventory');

        $categories = Category::all();

        $lowStockProducts = $lowStockQuery->whereHas('inventory', function ($q) {
            $q->where('quantity', '<=', 5);
        })->get();

        $category = $request->input('category');

        // Query the products with relationships and apply category filter
        $inventoryReport = Product::with(['inventory', 'category', 'salesDetails'])
            ->when($category, function ($query) use ($category) {
                // Filter products by category ID
                $query->where('category_id', $category);
            })
            ->get()
            ->map(function ($product) {
                // Calculate the total quantity sold
                $soldQuantity = $product->salesDetails->sum('quantity_sold');

                // Calculate the total sales revenue
                $totalSalesRevenue = $product->salesDetails->sum('line_total');

                // Get the remaining inventory quantity (default to 0 if none)
                $remainingQuantity = optional($product->inventory)->quantity ?? 0;

                // Assuming the product price is available in the `price` field of the product table
                $productPrice = $product->price ?? 0;

                // Calculate the estimated total sales based on remaining quantity
                $estimatedSales = $remainingQuantity * $productPrice;

                return [
                    'name' => $product->name,
                    'category' => $product->category->name ?? 'Uncategorized',
                    'sold_quantity' => $soldQuantity,
                    'remaining_quantity' => $remainingQuantity,
                    'total_sales_revenue' => $totalSalesRevenue,
                    'estimated_sales' => $estimatedSales, // Estimated sales from remaining inventory
                ];
            })
            ->filter(function ($product) {
                // Exclude products with zero sales (you can adjust this condition as needed)
                return $product['sold_quantity'] > 0;
            })
            ->values() // Re-index the array
            ->toArray();

        return Inertia::render('Inventory/Index', [
            'products' => $products,
            'filters' => $request->only('search'),
            'lowStockProducts' => $lowStockProducts,
            'inventoryReport' => $inventoryReport,
            'categories' => $categories,
            'selectedCategory' => $request->input('category', ''),
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
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        if (auth()->user()->role === 'cashier') {
            // Add to the existing quantity
            $inventory->update([
                'quantity' => $inventory->quantity + $request->quantity,
            ]);
        } else {
            // Update the quantity directly
            $inventory->update([
                'quantity' => $request->quantity,
            ]);
        }

        return redirect()->route('inventory.index')
            ->with('success', 'Quantity updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}
