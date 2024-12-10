<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // $user = User::factory()->create([
        //     'name' => 'cashier',
        //     'email' => 'cashier@example.com',
        //     'password' => bcrypt('password'),
        // ]);

        // $user->assignRole('cashier');

        $this->call([
            // RoleSeeder::class,
            // UserSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
