<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrestazioneController;
use App\Http\Controllers\StrutturaController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	// User
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::put('/update-profile', [AuthController::class, 'updateProfile']);

	// Performance
	Route::get('/prestazioni/{id_prestazione}', [PrestazioneController::class, 'SinglePerformance']);
	Route::get('/get_prestazioni', [PrestazioneController::class, 'getPrestazioni']);
	Route::put('/update_prestazione/{id_prestazione}', [PrestazioneController::class, 'updatePrestazione']);
	Route::post('/create_prestazione', [PrestazioneController::class, 'createPrestazione']);
	Route::put('/delete_prestazione/{id_prestazione}', [PrestazioneController::class, 'deletePrestazione']);
	Route::get('/get_tipo_prestazioni', [PrestazioneController::class, 'getTipoPrestazioni']);
	Route::get('/get_tipo_prestazione_singola/{id_tipo_prestazione}', [PrestazioneController::class, 'getTipoPrestazioneSingola']);

	// Structure
	Route::get('/get_strutture_paginate', [StrutturaController::class, 'getStrutturePaginate']);
	Route::get('/get_strutture', [StrutturaController::class, 'getStrutture']);
	Route::get('/get_prestazioni_azienda/{id_struttura}', [StrutturaController::class, 'getPrestazioniStruttura']);
	Route::get('/get_dettaglio_struttura/{id_struttura}', [StrutturaController::class, 'getDettaglioStruttura']);
	Route::post('/add_struttura_preferita/{id_struttura}', [StrutturaController::class, 'addStrutturaPreferita']);
	Route::get('/get_strutture_preferite', [StrutturaController::class, 'getStrutturePreferite']);
	Route::put('/remove_struttura_preferita/{id_struttura}', [StrutturaController::class, 'removeStrutturaPreferita']);
});
