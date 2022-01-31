<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Application;
use App\Models\Category;
use App\Models\Person;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$people = factory(Person::class, 5)->create();

        $people = Person::factory()->count(5)->create();

        /*factory(Application::class, 5)->create([
            'category_id' => '1',
            'state_id' => '1',
            'person_id' => '1',
        ]);*/

        Application::factory()->count(5)->create([
            'category_id' => '1',
            'state_id' => '1',
            'person_id' => '1',
        ]);


        Application::factory()->count(5)->create([
            'category_id' => '2',
            'state_id' => '2',
            'person_id' => '3',
        ]);

        Application::factory()->count(5)->create([
            'category_id' => '4',
            'state_id' => '3',
            'person_id' => '4',
        ]);

        // Admin user
        $admin = Person::create([
            'name' => 'Jesús Ordosgoitty',
            'community_id' => 1,
            'parish_id' => 1,
            'address' => 'Ave. Libertad 123',
            'dni' => '27572434',
        ]);
        User::create([
            'email' => 'admin@admin.com',
            'password' => bcrypt('qwerty123'),
            'role_id' => 1,
            'active' => true,
            'activation_token' => Str::random(60),
        ]);

        // Analyst user
        $analyst = Person::create([
            'name' => 'Andreina Santana',
            'community_id' => 1,
            'parish_id' => 1,
            'address' => 'Ave. Libertad 123',
            'dni' => 'V-26292605',
        ]);
        $analyst = User::create([
            'email' => 'analista@gmail.com',
            'password' => bcrypt('qwerty123'),
            'role_id' => 2,
            'active' => true,
            'activation_token' => Str::random(60),
        ]);

    }
}
