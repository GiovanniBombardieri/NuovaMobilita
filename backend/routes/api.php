<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrestazioneController;
use App\Http\Controllers\StrutturaController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	// Utente
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::put('/update-profile', [AuthController::class, 'updateProfile']);

	// Prestazioni
	Route::get('/get_prestazioni/{id_prestazione}', [PrestazioneController::class, 'getPrestazioniSingola']);
	Route::get('/get_prestazioni', [PrestazioneController::class, 'getPrestazioni']);
	Route::put('/update_prestazione/{id_prestazione}', [PrestazioneController::class, 'updatePrestazione']);
	Route::post('/create_prestazione', [PrestazioneController::class, 'createPrestazione']);
	Route::put('/delete_prestazione/{id_prestazione}', [PrestazioneController::class, 'deletePrestazione']);

	// Strutture
	Route::get('/get_strutture', [StrutturaController::class, 'getStrutture']);
});
