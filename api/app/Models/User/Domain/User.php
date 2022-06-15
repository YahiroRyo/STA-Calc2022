<?php

namespace App\Models\User\Domain;

class User
{
    private string $userName;
    private string $password;

    public function __construct($userName, $password)
    {
        $this->userName = $userName;
        $this->password = $password;
    }
    public function getUser(): array
    {
        return [
            'user_name' => $this->userName,
            'password' => $this->password,
        ];
    }
}
