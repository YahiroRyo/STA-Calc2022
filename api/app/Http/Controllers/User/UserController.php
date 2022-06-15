<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserCreateRequest;
use App\Services\User\UserService;
use App\Models\User\Domain\User as DomainUser;

class UserController extends Controller
{
    public function createUser(UserCreateRequest $request)
    {
        $validated = $request->validated();
        UserService::createUser(new DomainUser(
            $validated['user_name'],
            $validated['password'],
        ));
    }
}
