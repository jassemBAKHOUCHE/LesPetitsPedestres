<?php

use Illuminate\Support\Facades\Route;

Route::middleware(\App\Http\Middleware\DisableCors::class)->get('/', function () {
    return response()->json(['message' => 'CORS disabled']);
});

use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
