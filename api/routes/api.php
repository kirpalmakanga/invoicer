<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::get('callback', [AuthController::class, 'callback']);
    Route::get('refresh', [AuthController::class, 'refresh']);
});

Route::middleware('auth:api')->group(function () {
    Route::resource('customers', CustomerController::class);
    Route::delete('customers', [CustomerController::class, 'destroyMultiple']);

    Route::resource('invoices', InvoiceController::class);
    Route::delete('invoices', [InvoiceController::class, 'destroyMultiple']);

    Route::get('settings', [SettingsController::class, 'get']);
    Route::put('settings', [SettingsController::class, 'set']);
});
