<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Parish;


class ParishesSeeder extends Seeder
{
    public $parishes = Array(
        'BOLÍVAR',
        'MACARAPANA',
        'SANTA CATALINA',
        'SANTA ROSA',
        'SANTA TERESA'
    );

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->parishes as $key => $parish) {
            Parish::create([
                'name' => $parish
            ]);
        }
    }
}
