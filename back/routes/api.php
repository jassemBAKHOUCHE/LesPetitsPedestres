<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MoneyController;

Route::middleware(\App\Http\Middleware\DisableCors::class)->get('/', function () {
    return response()->json(['message' => 'CORS disabled']);
});

use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/addMoney', [MoneyController::class,'addMoney'])->middleware('auth:sanctum');
Route::get('/getMoney', [MoneyController::class,'getMoney'])->middleware('auth:sanctum');