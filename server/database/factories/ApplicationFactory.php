<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Application;
use Carbon\Carbon;

use Faker\Factory as Faker;


class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'num' => Application::getNewNum(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->text($maxNbChars = 200),
            'state_id' => rand(1, 2),
        ];
    }
}
