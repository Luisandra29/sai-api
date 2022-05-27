<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StreetSectorSeeder extends Seeder
{

    protected $rows = Array(
		[1, 1],
		[2, 1],
		[3, 1]
    );

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->rows as $row) {
		    DB::table('street_sector')->insert([
		        'sector_id' => $row[0],
		        'street_id' => $row[1]
		    ]);
		}
    }
}
