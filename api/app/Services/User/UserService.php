<?php

namespace App\Services\User;

use App\Models\User\Domain\User as DomainUser;
use App\Models\User\Eloquent\User as EloquentUser;

class UserService
{
    public static function createUser(DomainUser $user): void
    {
        EloquentUser::create($user->getUser());
    }
}
