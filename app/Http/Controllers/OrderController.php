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
use App\Models\PaymentMethod;
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
        $payment_method = PaymentMethod::all();

        // Return the data to the view
        return Inertia::render('Order/Index', [
            'products' => $products,
            'categories' => $categories,
            'payment_method' => $payment_method
        ]);
    }


    public function store(Request $request)
    {
        $sale = null; // Variable to hold the sale instance

        DB::transaction(function () use ($request, &$sale) {
            $sale = Sale::create([
                'user_id' => Auth::id(),
                'sale_date' => now(),
                'total_amount' => array_reduce($request->cart, function ($sum, $item) {
                    return $sum + $item['price'] * $item['quantity'];
                }, 0),
            ]);

            foreach ($request->cart as $item) {
                $product = Product::with('inventory')->find($item['id']);
                $inventory = $product->inventory;

                if ($inventory->quantity < $item['quantity']) {
                    throw new \Exception('Insufficient stock for product ' . $product->name);
                }

                SalesDetail::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['id'],
                    'quantity_sold' => $item['quantity'],
                    'payment_method_id' => $request->paymentMethod,
                    'payment_amount' => $request->cashAmount,
                    'phone_number' => $request->number,
                    'change' => $request->remainingBalance,
                    'line_total' => $item['price'] * $item['quantity'],
                ]);

                $inventory->quantity -= $item['quantity'];
                $inventory->save();
            }
        });

        return redirect()->route('order.index',);
    }
}
