<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{

    public $categories = Array(
        'Salud',
        'Servicios Funerarios',
        'Electricidad',
        'Agua',
        'Otros',
        'Financiero',
        'Gas',
        'Transporte',
        'Aseo'
    );


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->categories as $key => $value) {
            Category::create([
                'name' => $value
            ]);
        }
    }
}
