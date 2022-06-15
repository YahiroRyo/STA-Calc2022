<?php

namespace Database\Seeders\User\Eloquent;

use App\Models\User\Eloquent\User as EloquentUser;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        EloquentUser::factory(20)
                    ->create();
    }
}
