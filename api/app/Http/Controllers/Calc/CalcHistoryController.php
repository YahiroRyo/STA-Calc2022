<?php

namespace App\Http\Controllers\Calc;

use App\Http\Controllers\Controller;
use App\Http\Requests\Calc\CalcHistoryRequest;
use App\Models\Calc\Domain\CalcHistory as DomainCalcHistory;
use App\Services\Calc\CalcHistoryService;
use Illuminate\Database\Eloquent\Collection;

class CalcHistoryController extends Controller
{
    public function calcHistoryCreate(CalcHistoryRequest $request): void
    {
        CalcHistoryService::calcCreate(new DomainCalcHistory(
            auth()->id(),
            $request->calc,
        ));
    }
    public function findAll(): Collection
    {
        return CalcHistoryService::findAll();
    }
}
