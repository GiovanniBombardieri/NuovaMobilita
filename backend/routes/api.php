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
	Route::get('/get_prestazioni/{performance_id}', [PrestazioneController::class, 'SinglePerformance']);
	Route::get('/get_prestazioni', [PrestazioneController::class, 'getPrestazioni']);
	Route::put('/update_prestazione/{performance_id}', [PrestazioneController::class, 'updatePrestazione']);
	Route::post('/create_prestazione', [PrestazioneController::class, 'createPrestazione']);
	Route::put('/delete_prestazione/{performance_id}', [PrestazioneController::class, 'deletePrestazione']);
	Route::get('/get_tipo_prestazioni', [PrestazioneController::class, 'getTipoPrestazioni']);
	Route::get('/get_tipo_prestazione_singola/{performance_type_id}', [PrestazioneController::class, 'getTipoPrestazioneSingola']);

	// Strutture
	Route::get('/get_strutture_paginate', [StrutturaController::class, 'getStrutturePaginate']);
	Route::get('/get_strutture', [StrutturaController::class, 'getStrutture']);
	Route::get('/get_prestazioni_azienda/{structure_id}', [StrutturaController::class, 'getPrestazioniStruttura']);
	Route::get('/get_dettaglio_struttura/{structure_id}', [StrutturaController::class, 'getDettaglioStruttura']);
	Route::post('/add_struttura_preferita/{structure_id}', [StrutturaController::class, 'addStrutturaPreferita']);
	Route::get('/get_strutture_preferite', [StrutturaController::class, 'getStrutturePreferite']);
	Route::put('/remove_struttura_preferita/{structure_id}', [StrutturaController::class, 'removeStrutturaPreferita']);
});
