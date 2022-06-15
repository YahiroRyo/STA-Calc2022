<?php

namespace Database\Seeders;

use Database\Seeders\User\Eloquent\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class
        ]);
    }
}
