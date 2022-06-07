<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sector;


class SectorSeeder extends Seeder
{

    public $sectors = Array(
        'Barrio Bolívar',
        'Curacho',
        '22 de Agosto'
    );


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->sectors as $key => $value) {
            Sector::create([
                'community_id' => '44',
                'name' => $value
            ]);
        }
    }
}
