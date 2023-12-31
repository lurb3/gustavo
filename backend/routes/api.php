<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [\App\Http\Controllers\AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'getMe']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('company')->group(function() {
        Route::post('/', [CompanyController::class, 'create']);
        Route::get('/', [CompanyController::class, 'show']);
        Route::get('/{companyId}', [CompanyController::class, 'getCompanyById']);
        Route::put('/{companyId}', [CompanyController::class, 'update']);
        Route::delete('/{companyId}', [CompanyController::class, 'delete']);
    });

    Route::prefix('notes')->group(function() {
       Route::get('/', [\App\Http\Controllers\NotesController::class, 'show']);
       Route::post('/', [\App\Http\Controllers\NotesController::class, 'create']);
       Route::post('/position/{noteId}', [\App\Http\Controllers\NotesController::class, 'changePosition']);
       Route::delete('/{noteId}', [\App\Http\Controllers\NotesController::class, 'delete']);
    });

    Route::prefix('note_lists')->group(function() {
        Route::get('/', [\App\Http\Controllers\NoteListsController::class, 'show']);
    });
});
