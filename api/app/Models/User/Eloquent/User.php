<?php

namespace App\Models\User\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const UPDATED_AT = null;
    public $primaryKey = 'user_id';
    protected $fillable = [
        'user_name',
        'password'
    ];
    protected $hidden = [
        'password',
        'created_at'
    ];
}
