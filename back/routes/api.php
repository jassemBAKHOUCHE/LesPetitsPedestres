<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MoneyController;

Route::middleware(\App\Http\Middleware\DisableCors::class)->get('/', function () {
    return response()->json(['message' => 'CORS disabled']);
});

use App\Http\Controllers\AuthController;

Route::middleware(\App\Http\Middleware\DisableCors::class)->post('/register', [AuthController::class, "register"]);
Route::middleware(\App\Http\Middleware\DisableCors::class)->post('/login', [AuthController::class, 'login']);
Route::middleware(\App\Http\Middleware\DisableCors::class)->post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware(\App\Http\Middleware\DisableCors::class)->post('/addMoney', [MoneyController::class,'addMoney'])->middleware('auth:sanctum');
Route::middleware(\App\Http\Middleware\DisableCors::class)->get('/getMoney', [MoneyController::class,'getMoney'])->middleware('auth:sanctum');