<?php

use App\Http\Controllers\Calc\CalcHistoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('/users')->group(function() {
    Route::post('/create', [UserController::class, 'userCreate']);
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});
Route::prefix('/calc')->group(function() {
    Route::get('/test', function() {
        return view('welcome');
    });
    Route::prefix('/histories')->group(function() {
        Route::get('/', [CalcHistoryController::class, 'findAll']);
        Route::post('/', [CalcHistoryController::class, 'calcHistoryCreate']);
    });
});
