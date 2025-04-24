<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'cognome' => 'required|string|max:255',
			'ruolo' => 'required|string|max:50',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8',
		]);

		$user = User::create([
			'name' => $request->name,
			'cognome' => $request->cognome,
			'ruolo' => $request->ruolo,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'record_attivo' => 1,
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => [
				'name' => $user->name,
				'cognome' => $user->cognome,
				'ruolo' => $user->ruolo,
				'email' => $user->email,
			],
			'access_token' => $token,
			'token_type' => 'Bearer',
		]);
	}

	public function login(Request $request)
	{
		$request->validate([
			'email' => 'required|string|email',
			'password' => 'required|string',
		]);

		if (!Auth::attempt($request->only('email', 'password'))) {
			throw ValidationException::withMessages([
				'email' => ['Le credenziali fornite non sono corrette.'],
			]);
		}

		$user = Auth::user();
		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => [
				'name' => $user->name,
				'cognome' => $user->cognome,
				'ruolo' => $user->ruolo,
				'email' => $user->email,
				'telefono' => $user->telefono,
				'indirizzo' => $user->indirizzo,
			],
			'access_token' => $token,
			'token_type' => 'Bearer',
		]);
	}

	public function logout(Request $request)
	{
		$request->user()->tokens()->delete();

		return response()->json([
			'message' => 'Logout effettuato con successo.',
		]);
	}

	public function updateProfile(Request $request)
	{
		$user = $request->user();

		$request->validate([
			'telefono' => 'nullable|string|max:20',
			'indirizzo' => 'nullable|string|max:255',
		]);

		$user->telefono = $request->telefono;
		$user->indirizzo = $request->indirizzo;
		$user->save();

		return response()->json([
			'name' => $user->name,
			'cognome' => $user->cognome,
			'email' => $user->email,
			'telefono' => $user->telefono,
			'indirizzo' => $user->indirizzo,
			'ruolo' => $user->ruolo,
			'token' => $request->bearerToken(),
		]);
	}
}
