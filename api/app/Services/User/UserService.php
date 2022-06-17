<?php

namespace App\Services\User;

use App\Models\User\Domain\User as DomainUser;
use App\Models\User\Eloquent\User as EloquentUser;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class UserService
{
    public static function userCreate(DomainUser $user): void
    {
        $eloquentUser = $user->getUser();
        EloquentUser::create([
            'user_name' => $eloquentUser['user_name'],
            'password' => Hash::make($eloquentUser['password'])
        ]);
        if (!auth()->attempt($user->getUser(), true)) {
            throw new UnauthorizedHttpException('');
        }
    }
}
