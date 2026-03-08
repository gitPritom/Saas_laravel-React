<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Reports\ReportController;
use Illuminate\Support\Facades\Route;

// ── Public ────────────────────────────────────────────────────
Route::get('/', fn() => redirect()->route('login'));

// ── Auth routes ───────────────────────────────────────────────
require __DIR__ . '/auth.php';

// ── Protected routes ──────────────────────────────────────────
Route::middleware([
    'auth',
    'verified',
    \App\Http\Middleware\EnsureTenantAccess::class,
    \App\Http\Middleware\TrackLastSeen::class,
])->group(function () {

    // Dashboard — any authenticated user
    // Route::get('/dashboard', [DashboardController::class, 'index'])
    //     ->name('dashboard');

    // // Reports — analyst and above
    // Route::middleware('permission:view reports')->group(function () {
    //     Route::get('/reports', [ReportController::class, 'index'])
    //         ->name('reports.index');

    //     Route::middleware('permission:create reports')->group(function () {
    //         Route::post('/reports', [ReportController::class, 'store'])
    //             ->name('reports.store');
    //     });

    //     Route::middleware('permission:delete reports')->group(function () {
    //         Route::delete('/reports/{report}', [ReportController::class, 'destroy'])
    //             ->name('reports.destroy');
    //     });
    // });

    // Admin only
    Route::middleware('role:admin|super-admin')->group(function () {
        Route::get('/users', fn() => inertia('Users/Index'))
            ->name('users.index');

        Route::get('/settings', fn() => inertia('Settings/Index'))
            ->name('settings.index');
    });
});