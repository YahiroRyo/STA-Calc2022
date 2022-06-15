<?php

namespace Tests\Feature\User;

use App\Models\User\Domain\User as DomainUser;
use App\Models\User\Eloquent\User as EloquentUser;
use Tests\Feature\TestCaseAPI;

class UserCreateTest extends TestCaseAPI
{
    private DomainUser $domainUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->domainUser = new DomainUser('test', 'test1234');
    }
    public function test_ユーザーの作成を行う(): void
    {
        $user = $this->domainUser->getUser();
        $response = $this->post('/api/users', $user);
        $response->assertOk();
        $this->assertNotNull(EloquentUser::where('user_name', $user['user_name'])->first());
    }
}
