<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'login' => 'admin',
            'password' => bcrypt('qwerty123'),
            'active' => true,
            'activation_token' => Str::random(60),
            //'remember_token' => Str::random(10),
            'role_id' => 1
        ]);
    }
}
