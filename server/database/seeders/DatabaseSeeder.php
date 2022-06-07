<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ParishesSeeder::class);
        $this->call(StatesSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(CommunitiesSeeder::class);
        $this->call(CommunityParishSeeder::class);
        $this->call(CategoriesSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
