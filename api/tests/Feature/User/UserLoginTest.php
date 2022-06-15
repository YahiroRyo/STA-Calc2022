<?php

namespace Tests\Feature\User;

use App\Models\User\Eloquent\User;
use Tests\Feature\TestCaseAPI;

class UserLoginTest extends TestCaseAPI
{
    public function test_ユーザーログインを行う(): void
    {
        $user = User::first();
        $response = $this->post('/api/users/login', [
            'user_name' => $user->user_name,
            'password' => 'password',
        ]);
        $response->assertOk();
        $this->assertTrue(auth()->check());
    }
}
