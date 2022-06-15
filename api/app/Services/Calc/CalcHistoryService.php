<?php

namespace App\Services\Calc;

use App\Models\Calc\Domain\CalcHistory as DomainCalcHistory;
use App\Models\Calc\Eloquent\CalcHistory as EloquentCalcHistory;

class CalcHistoryService
{
    public static function calcCreate(DomainCalcHistory $calc): void
    {
        EloquentCalcHistory::create($calc->getCalc());
    }
}
