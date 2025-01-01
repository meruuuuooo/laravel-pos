<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Inventory;

class ProductAndInventorySeeder extends Seeder
{
    public function run(): void
    {
        // Products array
        $products = [
            [
                'id' => 1,
                'imageURL' => 'images/products/bearbrand.jpg',
                'name' => 'Bear Brand',
                'category_id' => 5, // Dairy Products
                'price' => 45.00,
            ],
            [
                'id' => 2,
                'imageURL' => 'images/products/coke_mismo.jpg',
                'name' => 'Coke Mismo',
                'category_id' => 2, // Beverages
                'price' => 15.00,
            ],
            [
                'id' => 3,
                'imageURL' => 'images/products/gardenia.jpg',
                'name' => 'Gardenia Bread',
                'category_id' => 6, // Bread & Bakery
                'price' => 55.00,
            ],
            [
                'id' => 4,
                'imageURL' => 'images/products/gsm_blue.jpg',
                'name' => 'GSM Blue',
                'category_id' => 14, // Alcoholic Beverages
                'price' => 120.00,
            ],
            [
                'id' => 5,
                'imageURL' => 'images/products/milo.jpg',
                'name' => 'Milo',
                'category_id' => 2, // Beverages
                'price' => 18.00,
            ],
            [
                'id' => 6,
                'imageURL' => 'images/products/piattos.jpg',
                'name' => 'Piattos',
                'category_id' => 1, // Food & Snacks
                'price' => 20.00,
            ],
            [
                'id' => 7,
                'imageURL' => 'images/products/pillows.jpg',
                'name' => 'Pillows',
                'category_id' => 1, // Food & Snacks
                'price' => 25.00,
            ],
            [
                'id' => 8,
                'imageURL' => 'images/products/shampoo.jpg',
                'name' => 'Shampoo',
                'category_id' => 7, // Personal Care
                'price' => 65.00,
            ],
            [
                'id' => 9,
                'imageURL' => 'images/products/sting.jpg',
                'name' => 'Sting',
                'category_id' => 2, // Beverages
                'price' => 12.00,
            ],
            [
                'id' => 10,
                'imageURL' => 'images/products/vitamilk.jpg',
                'name' => 'Vitamilk',
                'category_id' => 2, // Beverages
                'price' => 25.00,
            ],
        ];

        // Inventories array
        $inventories = [
            ['product_id' => 1, 'quantity' => 50],
            ['product_id' => 2, 'quantity' => 100],
            ['product_id' => 3, 'quantity' => 30],
            ['product_id' => 4, 'quantity' => 20],
            ['product_id' => 5, 'quantity' => 80],
            ['product_id' => 6, 'quantity' => 60],
            ['product_id' => 7, 'quantity' => 40],
            ['product_id' => 8, 'quantity' => 25],
            ['product_id' => 9, 'quantity' => 90],
            ['product_id' => 10, 'quantity' => 70],
        ];

        // Insert products into the database
        foreach ($products as $product) {
            Product::create($product);
        }

        // Insert inventories into the database
        foreach ($inventories as $inventory) {
            Inventory::create($inventory);
        }
    }
}
