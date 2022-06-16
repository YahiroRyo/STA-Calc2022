<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class LoginController extends Controller
{
    public function login(LoginRequest $request): void
    {
        if (!auth()->attempt($request->validated(), true))
        {
            throw new UnauthorizedHttpException('');
        }
    }
    public function logout(): void
    {
        auth()->logout();
    }
}
