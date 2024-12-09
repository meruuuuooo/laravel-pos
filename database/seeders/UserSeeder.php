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
            'name' => 'admin_user',
            'role' => 'admin',
        ]);
        $adminUser->assignRole('admin');

        // Create cashier user
        $cashierUser = User::factory()->create([
            'name' => 'cashier_user',
            'role' => 'cashier',
        ]);
        $cashierUser->assignRole('cashier');
    }
}
