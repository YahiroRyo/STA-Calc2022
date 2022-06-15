<?php

namespace Tests\Feature\Calc;

use App\Models\Calc\Eloquent\CalcHistory;
use App\Models\User\Eloquent\User;
use Tests\Feature\TestCaseAPI;

class CalcHistoryFindAllTest extends TestCaseAPI
{
    public function test_計算の履歴取得を行う()
    {
        $this->actingAs(User::first());
        $response = $this->get('/api/calc/histories');
        $response->assertOk();
        $response->assertJson(
            CalcHistory::where('user_id', auth()->id())
                        ->get()
                        ->toArray()
        );
    }
}
