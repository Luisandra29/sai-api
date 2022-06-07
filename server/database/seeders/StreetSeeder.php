<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Street;


class StreetSeeder extends Seeder
{

    public $street = Array(
        'CALLE PRINCIPAL'
    );

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->street as $key => $value) {
            Street::create([
                'name' => $value
            ]);
        }
    }
}
