<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SalesDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesDetail>
 */
class SalesDetailFactory extends Factory
{
    protected $model = SalesDetail::class;

    public function definition()
    {
        $quantity = $this->faker->numberBetween(1, 10);
        $price = $this->faker->randomFloat(2, 1, 100);

        return [
            'sale_id' => Sale::factory(),
            'product_id' => Product::factory(),
            'quantity_sold' => $quantity,
            'line_total' => $quantity * $price,
        ];
    }
}
