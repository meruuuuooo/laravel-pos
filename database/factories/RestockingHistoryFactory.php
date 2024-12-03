<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\RestockingHistory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RestockingHistory>
 */
class RestockingHistoryFactory extends Factory
{
    protected $model = RestockingHistory::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(),
            'quantity_restocked' => $this->faker->numberBetween(1, 50),
            'user_id' => User::factory(),
        ];
    }
}
