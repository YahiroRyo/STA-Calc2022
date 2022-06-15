<?php

namespace Tests\Feature\User;

use App\Models\User\Eloquent\User;
use Tests\Feature\TestCaseAPI;

class UserLogoutTest extends TestCaseAPI
{
    public function test_ユーザーログアウトを行う()
    {
        $this->actingAs(User::first());
        $response = $this->post('/api/users/logout');
        $response->assertOk();
        $this->assertFalse(auth()->check());
    }
}
