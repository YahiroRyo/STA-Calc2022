<?php

namespace App\Models\Calc\Domain;

class CalcHistory
{
    private int $userID;
    private string $calc;

    public function __construct(int $userID, string $calc)
    {
        $this->userID   = $userID;
        $this->calc     = $calc;
    }
    public function getCalc(): array
    {
        return [
            'user_id' => $this->userID,
            'calc' => $this->calc,
        ];
    }
}
