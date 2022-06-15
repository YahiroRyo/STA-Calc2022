<?php

namespace Database\Factories\User\Eloquent;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_name' => $this->faker->userName(),
            'password' => Hash::make('password')
        ];
    }
}
