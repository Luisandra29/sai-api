<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;


class ApplicationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Application::factory()->count(5)->create([
            'subcategory_id' => '1',
            'state_id' => '1',
            'person_id' => '1',
        ]);


        Application::factory()->count(5)->create([
            'subcategory_id' => '2',
            'state_id' => '2',
            'person_id' => '3',
        ]);

        Application::factory()->count(5)->create([
            'subcategory_id' => '3',
            'state_id' => '3',
            'person_id' => '4',
        ]);
    }
}
