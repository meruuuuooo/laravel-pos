<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $adminUser = User::factory()->create([
            'name' => 'john doe',
            'role' => 'admin',
            'email' => 'johndoe@example.com',
            'password' => bcrypt('admin123'),
        ]);
        $adminUser->assignRole('admin');

        // Create cashier user
        $cashierUser = User::factory()->create([
            'name' => 'jane doe',
            'role' => 'cashier',
            'email' => 'janedoe@example.com',
            'password' => bcrypt('cashier123'),
        ]);
        $cashierUser->assignRole('cashier');
    }
}
