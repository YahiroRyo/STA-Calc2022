<?php

namespace Database\Factories\Calc\Eloquent;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CalcHistoryFactory extends Factory
{
    public function definition()
    {
        return [
            'calc' => Str::random(20)
        ];
    }
}
