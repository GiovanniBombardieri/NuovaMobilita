<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Struttura;
use App\Models\Posizione;
use App\Models\Prestazione;
use App\Models\Recapito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		if ($request->ruolo === 'struttura') {
			return $this->registerStruttura($request);
		}

		$request->validate([
			'ruolo' => 'required|string|max:50',
			'name' => 'required|string|max:255',
			'cognome' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8',
		]);

		$id_posizione = (string) Str::uuid();

		$user = User::create([
			'id_posizione' => $id_posizione,
			'name' => $request->name,
			'cognome' => $request->cognome,
			'ruolo' => $request->ruolo,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'record_attivo' => 1,
		]);

		// Salvo la posizione dell'utente
		$posizione = Posizione::create([
			'id_posizione' => $id_posizione,
			'comune' => null,
			'provincia' => null,
			'via' => null,
			'numero_civico' => null,
			'cap' => null,
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => [
				'name' => $user->name,
				'cognome' => $user->cognome,
				'ruolo' => $user->ruolo,
				'email' => $user->email,
			],
			'user_position' => [
				'comune' => $posizione->comune,
				'provincia' => $posizione->provincia,
				'via' => $posizione->via,
				'numero_civico' => $posizione->numero_civico,
				'cap' => $posizione->cap,
			],
			'access_token' => $token,
			'token_type' => 'Bearer',
		]);
	}

	public function registerStruttura(Request $request)
	{
		DB::beginTransaction();
		try {
			Log::info('Inizio registrazione struttura');

			// Creo id_struttura, id_posizione, id_recapito
			$id_struttura = (string) Str::uuid();
			$id_posizione = (string) Str::uuid();
			$id_recapito = (string) Str::uuid();

			// Salvo la posizione
			Log::info('Creazione posizione', ['id_posizione' => $id_posizione]);
			$posizione = Posizione::create([
				'id_posizione' => $id_posizione,
				'comune' => $request->comune,
				'provincia' => $request->provincia,
				'via' => $request->via,
				'numero_civico' => $request->numero_civico,
				'cap' => $request->cap,
			]);

			// Salvo la struttura
			Log::info('Creazione struttura', ['id_struttura' => $id_struttura]);
			$struttura = Struttura::create([
				'id_struttura' => $id_struttura,
				'id_posizione' => $id_posizione,
				'ragione_sociale' => $request->ragione_sociale,
			]);

			// Salvo il recapito
			Log::info('Creazione recapito', ['id_recapito' => $id_recapito]);
			$recapito = Recapito::create([
				'id_recapito' => $id_recapito,
				'id_struttura' => $id_struttura,
				'id_tipo_recapito' => '0000004a-0000-0000-0000-000000000001',
				'mail' => $request->email,
			]);

			// Aggiorna struttura con id_recapito
			$struttura->id_recapito = $id_recapito;
			$struttura->save();

			// Salvo utente con email, password e ruolo
			Log::info('Creazione utente', ['id_struttura' => $id_struttura]);
			$user = User::create([
				'email' => $request->email,
				'password' => Hash::make($request->password),
				'ruolo' => 'struttura',
				'id_struttura' => $id_struttura,
			]);

			DB::commit();

			// Genero il token
			$token = $user->createToken('auth_token')->plainTextToken;

			return response()->json([
				'user' => [
					'ruolo' => $user->ruolo,
					'email' => $user->email,
					'ragione_sociale' => $struttura->ragione_sociale,
					'comune' => $posizione->comune,
					'provincia' => $posizione->provincia,
					'via' => $posizione->via,
					'numero_civico' => $posizione->numero_civico,
					'cap' => $posizione->cap,
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['error' => 'Errore nella registrazione della struttura', 'details' => $e->getMessage()], 500);
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
				'message' => 'Credenziali non valide.'
			], 401);
		}

		$user = Auth::user();
		Log::info('Utente loggato', ['email' => $user->email, 'ruolo' => $user->ruolo]);

		if (!$user || !($user instanceof \App\Models\User)) {
			return response()->json(['error' => 'Utente non autenticato'], 401);
		}

		$token = $user->createToken('auth_token')->plainTextToken;

		if ($user->ruolo === "utente") {
			$posizione = $user->posizione_utente;

			return response()->json([
				'user' => [
					'name' => $user->name,
					'cognome' => $user->cognome,
					'ruolo' => $user->ruolo,
					'email' => $user->email,
					'telefono' => $user->telefono,
					'user_position' => [
						'comune' => $posizione->comune ?? null,
						'provincia' => $posizione->provincia ?? null,
						'via' => $posizione->via ?? null,
						'numero_civico' => $posizione->numero_civico ?? null,
						'cap' => $posizione->cap ?? null,
					],
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		}

		if ($user->ruolo === "struttura") {
			$struttura = $user->struttura;
			$posizione = $struttura?->posizione;

			$recapiti = $struttura?->recapiti ?? collect();
			$recapitoConTelefono = $recapiti->first(function ($r) {
				return !empty($r->telefono) && $r->record_attivo === 1;
			});

			return response()->json([
				'user' => [
					'ruolo' => $user->ruolo,
					'email' => $user->email,
					'telefono' => $recapitoConTelefono->telefono ?? null,
					'ragione_sociale' => $struttura->ragione_sociale ?? null,
					'comune' => $posizione->comune ?? null,
					'provincia' => $posizione->provincia ?? null,
					'via' => $posizione->via ?? null,
					'numero_civico' => $posizione->numero_civico ?? null,
					'cap' => $posizione->cap ?? null,
				],
				'access_token' => $token,
				'token_type' => 'Bearer',
			]);
		}

		return response()->json([
			'error' => 'Ruolo non riconosciuto.'
		], 422);
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

		if ($user->ruolo === "utente") {
			$posizione = $user->posizione_utente;

			$request->validate([
				'name' => 'nullable|string|max:255',
				'cognome' => 'nullable|string|max:255',
				'email' => 'nullable|string|max:255',
				'telefono' => 'nullable|string|max:20',
				'indirizzo' => 'nullable|string|max:255',
				'comune' => 'nullable|string|max:100',
				'provincia' => 'nullable|char|max:2',
				'cap' => 'nullable|char|max:5',
				'via' => 'nullable|string|max:100',
				'numero_civico' => 'nullable|string|max:10',
			]);

			$user->name = $request->name;
			$user->cognome = $request->cognome;
			$user->email = $request->email;
			$user->telefono = $request->telefono;
			$posizione->comune = $request->comuneUtente;
			$posizione->provincia = $request->provinciaUtente;
			$posizione->cap = $request->capUtente;
			$posizione->via = $request->viaUtente;
			$posizione->numero_civico = $request->numero_civicoUtente;

			$user->save();
			$posizione->save();

			return response()->json([
				'name' => $user->name,
				'cognome' => $user->cognome,
				'email' => $user->email,
				'telefono' => $user->telefono,
				'ruolo' => $user->ruolo,
				'access_token' => $request->bearerToken(),
				'comune' => $posizione->comune,
				'provincia' => $posizione->provincia,
				'via' => $posizione->via,
				'numero_civico' => $posizione->numero_civico,
				'cap' => $posizione->cap,
			]);
		} else if ($user->ruolo === "struttura") {
			$struttura = $user->struttura;
			$posizione = $struttura?->posizione;
			$recapiti = $struttura?->recapiti;

			$struttura->ragione_sociale = $request->ragione_sociale;
			$user->email = $request->email;
			$posizione->comune = $request->comune;
			$posizione->provincia = $request->provincia;
			$posizione->via = $request->via;
			$posizione->numero_civico = $request->numero_civico;
			$posizione->cap = $request->cap;

			if ($request->telefonoStruttura) {
				$recapitoConTelefonoAttivo = $recapiti?->first(function ($r) {
					return (!empty($r->telefono) && $r->record_attivo === 1);
				});
				if ($recapitoConTelefonoAttivo) {
					$recapitoConTelefonoAttivo->telefono = $request->telefonoStruttura;
					$recapitoConTelefonoAttivo->save();
				} else {
					$nuovoRecapito = new Recapito();
					$nuovoRecapito->id_recapito = (string) \Illuminate\Support\Str::uuid();
					$nuovoRecapito->id_struttura = $struttura->id_struttura;
					$nuovoRecapito->telefono = $request->telefonoStruttura;
					$nuovoRecapito->id_tipo_recapito = '0000004e-0000-0000-0000-000000000002';
					$nuovoRecapito->time_modifica = now();
					$nuovoRecapito->record_attivo = 1;

					$nuovoRecapito->save();
				}
			} else if ($request->telefonoStruttura === NULL) {
				$recapitoConTelefono = $recapiti?->first(function ($r) {
					return !empty($r->telefono);
				});

				if ($recapitoConTelefono) {
					$recapitoConTelefono->record_attivo = 0;
					$recapitoConTelefono->save();
				}
			}

			if ($request->email) {
				$recapitoConEmail = $recapiti?->first(function ($r) {
					return !empty($r->email);
				});

				if ($recapitoConEmail) {
					$recapitoConEmail->email = $request->email;
					$recapitoConEmail->save();
				}
			}

			$user->save();
			$struttura->save();
			$posizione->save();

			return response()->json([
				'ruolo' => $user->ruolo,
				'email' => ($user->email === $recapitoConEmail->email) ? $user->email : null,
				'telefono' => (isset($nuovoRecapito) ? $nuovoRecapito->telefono : (isset($recapitoConTelefonoAttivo) ? $recapitoConTelefonoAttivo->telefono : null)),
				'ragione_sociale' => $struttura->ragione_sociale,
				'comune' => $posizione->comune,
				'provincia' => $posizione->provincia,
				'via' => $posizione->via,
				'numero_civico' => $posizione->numero_civico,
				'cap' => $posizione->cap,
				'access_token' => $request->bearerToken(),
			]);
		}
	}
}
