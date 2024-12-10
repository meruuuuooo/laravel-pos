<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $categories = [
            'Food & Snacks',
            'Beverages',
            'Prepared Foods',
            'Frozen Foods',
            'Dairy Products',
            'Bread & Bakery',
            'Personal Care',
            'Health & Medicine',
            'Baby Products',
            'Household Supplies',
            'Pet Supplies',
            'Stationery & Office Supplies',
            'Tobacco & Accessories',
            'Alcoholic Beverages',
            'Seasonal Items',
            'Miscellaneous',
            'Automotive Supplies',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
