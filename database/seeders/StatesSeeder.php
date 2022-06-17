<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\State;


class StatesSeeder extends Seeder
{

    public $states = Array(
        ['name' => 'Pendiente', 'list_name' => 'Pendientes'],
        ['name' => 'Aprobada', 'list_name' => 'Aprobadas'],
        ['name' => 'Rechazada', 'list_name' => 'Rechazadas'],
    );


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->states as $item) {
            State::create($item);
        }
    }
}
