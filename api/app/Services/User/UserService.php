<?php

namespace App\Services\User;

use App\Models\User\Domain\User as DomainUser;
use App\Models\User\Eloquent\User as EloquentUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class UserService
{
    public static function userCreate(DomainUser $user): void
    {
        DB::transaction(function () use ($user) {
            $eloquentUser = $user->getUser();
            EloquentUser::create([
                'user_name' => $eloquentUser['user_name'],
                'password' => Hash::make($eloquentUser['password'])
            ]);
            if (!auth()->attempt($eloquentUser, true)) {
                throw new UnauthorizedHttpException('');
            }
        });
    }
}
