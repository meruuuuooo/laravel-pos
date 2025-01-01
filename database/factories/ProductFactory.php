<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        

        return [
            'imageURL' => $this->faker->imageUrl(),
            'name' => $this->faker->name,
            'category_id' => Category::factory(),
            'price' => $this->faker->randomFloat(2, 1, 1000),
        ];
    }
}
