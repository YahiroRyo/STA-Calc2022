<?php

namespace Tests\Feature\Calc;

use App\Models\Calc\Eloquent\CalcHistory;
use App\Models\User\Eloquent\User;
use Tests\TestCase;

class CalcHistoryCreateTest extends TestCase
{
    public function test_計算の履歴保存を行う()
    {
        $calc = '1 + 2';
        $this->actingAs(User::first());
        $response = $this->post('/api/calc/histories', [
            'calc' => $calc
        ]);
        $response->assertOk();
        $this->assertNotEmpty(CalcHistory::where('calc', $calc)->first());
    }
}
