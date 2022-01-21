<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{

    protected $roles = Array(
        'Admininistrador', 'Analista', 'Cliente'
    );

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->roles as $role) {
            Rol::create([
                'name' => $role
            ]);
        }
    }
}
