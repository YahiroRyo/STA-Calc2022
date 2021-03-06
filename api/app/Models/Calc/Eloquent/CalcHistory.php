<?php

namespace App\Models\Calc\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalcHistory extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;
    public $primaryKey = 'calc_history_id';
    protected $fillable = [
        'user_id',
        'calc'
    ];
    protected $hidden = [
        'calc_history_id',
        'user_id',
        'created_at'
    ];
}
