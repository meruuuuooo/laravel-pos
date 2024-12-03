<?php

namespace Database\Factories;

use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    protected $model = Inventory::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(),
            'quantity_in_stock' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->randomFloat(2, 1, 100),
        ];
    }
}
