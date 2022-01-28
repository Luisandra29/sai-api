<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Person;
use App\Models\Community;
use App\Models\Parish;
use Faker\Generator as Faker;

class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $communities = Community::all();
        $parishes = Parish::all();

        $factory->define(Person::class, function (Faker $faker) use ($communities, $parishes) {
            $community = $communities->random(1)->first()->id;
            $parish = $parishes->random(1)->first()->id;
        });

        return [
            'name' => $faker->name,
            'dni' => $faker->unique()->randomNumber,
            'phone' => $faker->tollFreePhoneNumber,
            'address' => $faker->address,
            'community_id' => $community,
            'parish_id' => $parish,
        ];
    }

}
