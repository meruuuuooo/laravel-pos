<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category', 'inventory')->get();

        return Inertia::render('Product/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categories = Category::all();

        return Inertia::render('Product/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'imageURL' => 'image|mimes:jpg,jpeg,png|max:2048|nullable',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
        ]);

        // Begin transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Check if a valid image file was uploaded
            if ($request->hasFile('imageURL') && $request->file('imageURL')->isValid()) {
                $category = Category::find($request->category_id);
                if (!$category) {
                    throw new \Exception('Category not found');
                }

                $categoryName = $category->name;

                // Generate a unique name for the image
                $imageName = $request->name . '_' . time() . '.' . $request->file('imageURL')->getClientOriginalExtension();

                // Store the image in a folder named after the category
                $imagePath = $request->file('imageURL')->storeAs('images/' . $categoryName, $imageName, 'public');

                // Get the public URL of the image
                $imageURL = Storage::url($imagePath);
            } else {
                // Set a default image URL if no image was uploaded
                $imageURL = '/storage/images/default.png'; // Ensure this path matches your default image location
            }

            // Create the product
            $product = Product::create([
                'imageURL' => $imageURL,
                'name' => $request->name,
                'category_id' => $request->category_id,
                'price' => $request->price,
            ]);

            // Create an inventory record for the product
            $product->inventory()->create([
                'quantity' => $request->quantity,
            ]);

            // Commit transaction
            DB::commit();

            return redirect()->route('product.create')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to create product. ' . $e->getMessage()]);
        }
    }





    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        // Load the product along with its category and inventory
        $product = Product::with(['category', 'inventory'])->findOrFail($product->id);

        // Fetch all categories for the dropdown
        $categories = Category::all();

        // Send product data with inventory quantity
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'imageURL' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0', // Validate quantity
        ]);

        // Find the product or fail
        $product = Product::findOrFail($id);

        // Handle image update
        if ($request->hasFile('imageURL') && $request->file('imageURL')->isValid()) {
            $category = Category::find($validatedData['category_id']);
            $categoryName = $category->name;
            $imageName = $validatedData['name'] . '_' . time() . '.' . $request->file('imageURL')->getClientOriginalExtension();
            $imagePath = $request->file('imageURL')->storeAs('images/' . $categoryName, $imageName, 'public');
            $imageURL = Storage::url($imagePath);

            if ($product->imageURL && $product->imageURL !== '/storage/images/default.png') {
                Storage::delete(str_replace('/storage/', 'public/', $product->imageURL));
            }

            $product->imageURL = $imageURL;
        }

        // Update product details
        $product->update([
            'name' => $validatedData['name'],
            'category_id' => $validatedData['category_id'],
            'price' => $validatedData['price'],
        ]);

        // Update inventory quantity
        if ($product->inventory) {
            $product->inventory->update(['quantity' => $validatedData['quantity']]);
        } else {
            // Create inventory record if it doesn't exist
            $product->inventory()->create(['quantity' => $validatedData['quantity']]);
        }

        return redirect()->route('product.index')->with('success', 'Product updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->inventory->delete();
        $product->delete();
    }
}
