<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subcategory;


class SubcategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public $category_agua = Array(
        'Agua por tuberia', 'Camión de agua', 'Agua potable'
    );


    public function run()
    {
        foreach($this->category_agua as $agua) {
            Subcategory::create([
                'name' => $agua,
                'category_id' => '4'
            ]);
        }
    }
}
