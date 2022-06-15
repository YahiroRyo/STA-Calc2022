<?php

use App\Http\Controllers\Calc\CalcHistoryController;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/users')->group(function() {
    Route::post('/', [UserController::class, 'userCreate']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/logout', [LoginController::class, 'logout']);
});
Route::prefix('/calc')->group(function() {
    Route::prefix('/histories')->group(function() {
        Route::post('/', [CalcHistoryController::class, 'calcHistoryCreate']);
    });
});
