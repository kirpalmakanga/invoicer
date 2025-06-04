<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::match(['GET', 'POST'], 'login', [AuthController::class, 'login'])->name(
    'login'
);

Route::prefix('auth')->group(function () {
    Route::get('redirect', [AuthController::class, 'redirect']);
    Route::get('token', [AuthController::class, 'token']);
    Route::get('logout', [AuthController::class, 'logout']);
});
