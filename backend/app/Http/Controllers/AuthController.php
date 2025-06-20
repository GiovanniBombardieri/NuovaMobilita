<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Structure;
use App\Models\Position;
use App\Models\Contact;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		if ($request->ruolo === 'structure') {
			return $this->registerStruttura($request);
		}

		$request->validate([
			'role' => 'required|string|max:50',
			'name' => 'required|string|max:255',
			'surname' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8',
		]);

		$position_id = (string) Str::uuid();

		$user = User::create([
			'position_id' => $position_id,
			'name' => $request->name,
			'surname' => $request->surname,
			'role' => $request->role,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'active_record' => 1,
		]);

		$position = Position::create([
			'position_id' => $position_id,
			'city' => null,
			'province' => null,
			'street' => null,
			'civic_number' => null,
			'cap' => null,
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => [
				'name' => $user->name,
				'surname' => $user->surname,
				'role' => $user->role,
				'email' => $user->email,
			],
			'user_position' => [
				'city' => $position->city,
				'province' => $position->province,
				'street' => $position->street,
				'civic_number' => $position->civic_number,
				'cap' => $position->cap,
			],
			'access_token' => $token,
			'token_type' => 'Bearer',
		]);
	}

	public function registerStruttura(Request $request)
	{
		DB::beginTransaction();
		try {
			// Create structure_id, position_id, contact_id
			$structure_id = (string) Str::uuid();
			$position_id = (string) Str::uuid();
			$contact_id = (string) Str::uuid();

			// Save position
			$position = Position::create([
				'position_id' => $position_id,
				'city' => $request->city,
				'province' => $request->province,
				'street' => $request->street,
				'civic_number' => $request->civic_number,
				'cap' => $request->cap,
			]);

			// Save structure
			$structure = Structure::create([
				'structure_id' => $structure_id,
				'position_id' => $position_id,
				'corporate' => $request->corporate,
			]);

			// Save contact
			$contact = Contact::create([
				'contact_id' => $contact_id,
				'structure_id' => $structure_id,
				'contact_type_id' => '0000004a-0000-0000-0000-000000000001',
				'mail' => $request->email,
			]);

			// Update structure contact_id
			$structure->contact_id = $contact_id;
			$structure->save();

			// Save user with mail, password and role
			$user = User::create([
				'email' => $request->email,
				'password' => Hash::make($request->password),
				'role' => 'structure',
				'structure_id' => $structure_id,
			]);

			DB::commit();

			// Create token
			$token = $user->createToken('auth_token')->plainTextToken;

			return response()->json([
				'user' => [
					'role' => $user->role,
					'email' => $user->email,
					'corporate' => $structure->corporate,
					'city' => $position->city,
					'province' => $position->province,
					'street' => $position->street,
					'civic_number' => $position->civic_number,
					'cap' => $position->cap,
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['error' => 'Error in recording the structure', 'details' => $e->getMessage()], 500);
		}
	}

	public function login(Request $request)
	{
		$request->validate([
			'email' => 'required|string|email',
			'password' => 'required|string',
		]);

		if (!Auth::attempt($request->only('email', 'password'))) {
			return response()->json([
				'message' => 'Not valid credentials.'
			], 401);
		}

		$user = Auth::user();
		if (!$user || !($user instanceof \App\Models\User)) {
			return response()->json(['error' => 'User not authenticated'], 401);
		}

		$token = $user->createToken('auth_token')->plainTextToken;

		if ($user->role === "user") {
			$position = $user->user_position;

			return response()->json([
				'user' => [
					'name' => $user->name,
					'surname' => $user->surname,
					'role' => $user->role,
					'email' => $user->email,
					'phone' => $user->phone,
					'user_position' => [
						'city' => $posizione->city ?? null,
						'province' => $posizione->province ?? null,
						'street' => $posizione->street ?? null,
						'civic_number' => $posizione->civic_number ?? null,
						'cap' => $posizione->cap ?? null,
					],
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		}

		if ($user->role === "structure") {
			$structure = $user->structure;
			$position = $structure?->position;

			$contact = $structure?->contact ?? collect();
			$contactWithPhone = $contact->first(function ($r) {
				return !empty($r->phone) && $r->active_record === 1;
			});

			return response()->json([
				'user' => [
					'role' => $user->role,
					'email' => $user->email,
					'phone' => $contactWithPhone->phone ?? null,
					'corporate' => $structure->corporate ?? null,
					'city' => $position->city ?? null,
					'province' => $position->province ?? null,
					'street' => $position->street ?? null,
					'civic_number' => $position->civic_number ?? null,
					'cap' => $position->cap ?? null,
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		}

		return response()->json([
			'error' => 'Not recognized role.'
		], 422);
	}

	public function logout(Request $request)
	{
		$request->user()->tokens()->delete();

		return response()->json([
			'message' => 'Successful logout.',
		]);
	}

	public function updateProfile(Request $request)
	{
		$user = $request->user();

		if ($user->role === "user") {
			$position = $user->user_position;

			$request->validate([
				'name' => 'nullable|string|max:255',
				'surname' => 'nullable|string|max:255',
				'email' => 'nullable|string|max:255',
				'phone' => 'nullable|string|max:20',
				'address' => 'nullable|string|max:255',
				'city' => 'nullable|string|max:100',
				'province' => 'nullable|char|max:2',
				'cap' => 'nullable|char|max:5',
				'street' => 'nullable|string|max:100',
				'civic_number' => 'nullable|string|max:10',
			]);

			$user->name = $request->name;
			$user->surname = $request->surname;
			$user->email = $request->email;
			$user->phone = $request->phone;
			$position->city = $request->userCity;
			$position->province = $request->userProvince;
			$position->cap = $request->userCap;
			$position->street = $request->userStreet;
			$position->civic_number = $request->userCivicNumber;

			$user->save();
			$position->save();

			return response()->json([
				'name' => $user->name,
				'surname' => $user->surname,
				'email' => $user->email,
				'phone' => $user->phone,
				'role' => $user->role,
				'access_token' => $request->bearerToken(),
				'city' => $position->city,
				'province' => $position->province,
				'street' => $position->street,
				'civic_number' => $position->civic_number,
				'cap' => $position->cap,
			]);
		} else if ($user->role === "structure") {
			$structure = $user->structure;
			$position = $structure?->position;
			$contact = $structure?->contact;

			$structure->corporate = $request->corporate;
			$user->email = $request->email;
			$position->city = $request->city;
			$position->province = $request->province;
			$position->street = $request->street;
			$position->civic_number = $request->civic_number;
			$position->cap = $request->cap;

			if ($request->structurePhone) {
				$contactWithActivePhone = $contact?->first(function ($r) {
					return (!empty($r->phone) && $r->active_record === 1);
				});
				if ($contactWithActivePhone) {
					$contactWithActivePhone->phone = $request->structurePhone;
					$contactWithActivePhone->save();
				} else {
					$newContact = new Contact();
					$newContact->contact_id = (string) \Illuminate\Support\Str::uuid();
					$newContact->structure_id = $structure->structure_id;
					$newContact->phone = $request->structurePhone;
					$newContact->contact_type_id = '0000004e-0000-0000-0000-000000000002';
					$newContact->change_time = now();
					$newContact->active_record = 1;

					$newContact->save();
				}
			} else if ($request->structurePhone === NULL) {
				$contactWithPhone = $contact?->first(function ($r) {
					return !empty($r->phone);
				});

				if ($contactWithPhone) {
					$contactWithPhone->active_record = 0;
					$contactWithPhone->save();
				}
			}

			if ($request->email) {
				$contactWithEmail = $contact?->first(function ($r) {
					return !empty($r->email);
				});

				if ($contactWithEmail) {
					$contactWithEmail->email = $request->email;
					$contactWithEmail->save();
				}
			}

			$user->save();
			$structure->save();
			$position->save();

			return response()->json([
				'role' => $user->role,
				'email' => ($user->email === $contactWithEmail->email) ? $user->email : null,
				'phone' => (isset($newContact) ? $newContact->phone : (isset($contactWithActivePhone) ? $contactWithActivePhone->phone : null)),
				'corporate' => $structure->corporate,
				'city' => $position->city,
				'province' => $position->province,
				'street' => $position->street,
				'civic_number' => $position->civic_number,
				'cap' => $position->cap,
				'access_token' => $request->bearerToken(),
			]);
		}
	}
}
