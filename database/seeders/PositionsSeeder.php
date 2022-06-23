<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionsSeeder extends Seeder
{

    protected $rows = Array(
        [1, 'Lider Territorial'],
        [2, 'Lider de UBCH'],
        [3, 'Lider de Calle'],
        [4, 'Persona Natural']
    );

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->rows as $row) {
            DB::table('positions')->insert([
                'id' => $row[0],
                'name' => $row[1]
            ]);
        }
    }
}
