<?php

namespace App\Services\Calc;

use App\Models\Calc\Domain\CalcHistory as DomainCalcHistory;
use App\Models\Calc\Eloquent\CalcHistory as EloquentCalcHistory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CalcHistoryService
{
    public static function calcCreate(DomainCalcHistory $calc): void
    {
        EloquentCalcHistory::create($calc->getCalc());
    }
    public static function findAll(): Collection
    {
        $calcHistories = EloquentCalcHistory::where('user_id', auth()->id())
                                            ->orderBy('created_at', 'desc')
                                            ->get();
        if ($calcHistories->isEmpty()) throw new ModelNotFoundException();
        return $calcHistories;
    }
}
