<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerformanceController;
use App\Http\Controllers\StructureController;
use App\Http\Controllers\GeoCodingController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	// User
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::put('/update-profile/user', [AuthController::class, 'updateProfileUser']);
	Route::put('/update-profile/structure', [AuthController::class, 'updateProfileStructure']);

	// Performance
	Route::get('/performance/{performance_id}', [PerformanceController::class, 'SinglePerformance']);
	Route::get('/performance', [PerformanceController::class, 'getPerformance']);
	Route::put('/performance/{performance_id}', [PerformanceController::class, 'updatePerformance']);
	Route::post('/performance', [PerformanceController::class, 'createPerformance']);
	Route::post('/performance/{performance_type_id}', [PerformanceController::class, 'createPerformanceFromnTypeId']);
	Route::delete('/performance/{performance_id}', [PerformanceController::class, 'deletePerformance']);
	Route::get('/performance_type', [PerformanceController::class, 'getPerformanceType']);
	Route::get('/single_performance_type/{performance_type_id}', [PerformanceController::class, 'getSinglePerformanceType']);

	// Structure
	Route::get('/paginated_structures', [StructureController::class, 'getPaginatedStructures']);
	Route::get('/structures', [StructureController::class, 'getStructures']);
	Route::get('/structure_performances/{structure_id}', [StructureController::class, 'getStructurePerformances']);
	Route::get('/structure_detail/{structure_id}', [StructureController::class, 'getStructureDetail']);
	Route::post('/preferred_structure/{structure_id}', [StructureController::class, 'addPreferredStructure']);
	Route::get('/preferred_structures', [StructureController::class, 'getPreferredStructures']);
	Route::delete('/preferred_structure/{structure_id}', [StructureController::class, 'removePreferredStructure']);
});

// Geocoding
Route::get('/geocode', [GeoCodingController::class, 'search']);
