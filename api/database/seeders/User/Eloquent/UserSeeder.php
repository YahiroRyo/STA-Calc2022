<?php

namespace Database\Seeders\User\Eloquent;

use App\Models\Calc\Eloquent\CalcHistory as EloquentCalcHistory;
use App\Models\User\Eloquent\User as EloquentUser;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        EloquentUser::factory(20)
                    ->create()
                    ->each(function($user) {
                        EloquentCalcHistory::factory(10)
                                            ->create(['user_id' => $user->user_id]);
                    });
    }
}
