<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SalesDetail;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index(Request $request)
    {

        

        // Fetch products with inventory quantity greater than or equal to 1, including their category
        $products = Product::with('category', 'inventory') // Load the related category
            ->whereHas('inventory', function ($query) {
                $query->where('quantity', '>=', 1); // Filter by inventory quantity
            })
            ->get();

        // Fetch all categories, ordered alphabetically by name
        $categories = Category::orderBy('name', 'asc')->get();

        // Return the data to the view
        return Inertia::render('Order/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }




    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'cart' => 'required|array',
            'cart.*.id' => 'exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
        ]);

        // Begin a database transaction
        DB::transaction(function () use ($request) {
            // Create the sale record
            $sale = Sale::create([
                'user_id' => Auth::id(),
                'sale_date' => now(),
                'total_amount' => array_reduce($request->cart, function ($sum, $item) {
                    return $sum + $item['price'] * $item['quantity'];
                }, 0),
            ]);

            // Loop through the cart and create sales details
            foreach ($request->cart as $item) {
                // Retrieve the product and its inventory
                $product = Product::with('inventory')->find($item['id']);
                $inventory = $product->inventory;

                // Check if there is enough stock
                if ($inventory->quantity < $item['quantity']) {
                    throw new \Exception('Insufficient stock for product ' . $product->name);
                }

                // Create sales detail
                SalesDetail::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['id'],
                    'quantity_sold' => $item['quantity'],
                    'line_total' => $item['price'] * $item['quantity'],
                ]);

                // Reduce product stock in the inventory
                $inventory->quantity -= $item['quantity'];
                $inventory->save();
            }
        });

        // Redirect to the order index page
        return redirect()->route('order.index')->with('success', 'Order placed successfully');
    }
}
