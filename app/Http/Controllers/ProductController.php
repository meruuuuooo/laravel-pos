<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Events\ProductAdded;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Inventory;

class ProductController extends Controller
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

        // Paginate results
        $products = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'filters' => $request->only('search'),
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

    public function deletedProducts(Request $request)
    {
        $products = Product::onlyTrashed()->with('category', 'inventory')->paginate(10);

        return Inertia::render('Product/Trash', [
            'products' => $products,
        ]);
    }

    public function restore($id)
    {
        Product::withTrashed()
            ->where('id', $id)
            ->restore();

        return redirect()->route('product.deleted');
    }

    // public function viewTrash(Request $request)
    // {
    //     // Fetch trashed products with their category relationship
    //     $deletedProducts = Product::onlyTrashed()->with('category')->get();

    //     // Fetch trashed inventory
    //     $deletedInventory = Inventory::onlyTrashed()->get();

    //     // Map inventory to their corresponding products
    //     $trashedProductsWithInventory = $deletedProducts->map(function ($product) use ($deletedInventory) {
    //         // Find the inventory that belongs to the product
    //         $inventory = $deletedInventory->firstWhere('product_id', $product->id);
    //         $product->inventory = $inventory; // Attach inventory to the product
    //         return $product;
    //     });

    //     // Paginate the results manually
    //     $currentPage = LengthAwarePaginator::resolveCurrentPage(); // Get current page
    //     $perPage = 10; // Set items per page
    //     $currentPageItems = $trashedProductsWithInventory->slice(($currentPage - 1) * $perPage, $perPage)->values();

    //     $paginatedProducts = new LengthAwarePaginator(
    //         $currentPageItems,
    //         $trashedProductsWithInventory->count(),
    //         $perPage,
    //         $currentPage,
    //         [
    //             'path' => $request->url(),
    //             'query' => $request->query(),
    //         ]
    //     );

    //     return Inertia::render('Product/Trash', [
    //         'products' => $paginatedProducts,
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product = Product::findOrFail($product->id);
        $product->delete();

        return redirect()->route('product.index')->with('success', 'Product deleted successfully.');
    }
}
