<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

use App\Models\Person;
use App\Models\Community;
use App\Models\Parish;
use App\Models\Sector;
use App\Models\Street;
use Illuminate\Support\Str;

class PersonFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Person::class;

     //$faker = Faker::create();


    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $communities = Community::all();
        $parishes = Parish::all();
        $sectors = Sector::all();
        $streets = Street::all();

        $community = $communities->random(1)->first()->id;
        $parish = $parishes->random(1)->first()->id;

        $sector = $sectors->random(1)->first()->id;
        $street = $streets->random(1)->first()->id;

        return [
            'name' => $this->faker->name(),
            'dni' => $this->faker->unique()->randomNumber(),
            'phone' => $this->faker->tollFreePhoneNumber(),
            'address' => $this->faker->address(),
            'community_id' => $community,
            'parish_id' => $parish,
            'sector_id' => $sector,
            'street_id' => $street,
        ];
    }

}
