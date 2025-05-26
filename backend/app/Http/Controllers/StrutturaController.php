<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Struttura;
use App\Models\Posizione;
use App\Models\Prestazione;
use App\Models\Recapito;
use App\Models\StrutturaPreferita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StrutturaController extends Controller
{
    public function getStrutturePaginate(Request $request)
    {
        $strutture = User::whereNotNull('id_struttura')
            ->with(['struttura.posizione'])
            ->paginate(4);

        return response()->json($strutture);
    }

    public function getStrutture(Request $request)
    {
        $strutture = Struttura::where('record_attivo', 1)
            ->with('posizione')
            ->get();
        return response()->json(['data' => $strutture]);
    }

    public function getPrestazioniStruttura($id_struttura)
    {
        $struttura = Struttura::with('prestazioni.tipoPrestazione', 'prestazioni.valore')->find($id_struttura);

        if (!$struttura) {
            return response()->json(['message' => 'Struttura non trovata'], 404);
        }

        return response()->json([
            'struttura' => $struttura->ragione_sociale,
            'prestazioni' => $struttura->prestazioni
        ]);
    }

    public function getDettaglioStruttura($id_struttura)
    {
        $struttura = Struttura::with(['recapiti', 'posizione'])->find($id_struttura);

        if (!$struttura) {
            return response()->json(['message' => 'Struttura non trovata'], 404);
        }

        // return response()->json($struttura);
        return response()->json([
            'struttura' => [
                'ragione_sociale' => $struttura->ragione_sociale,
            ],
            'posizione' => [
                'cap' => $struttura->posizione->cap,
                'comune' => $struttura->posizione->comune,
                'numero_civico' => $struttura->posizione->numero_civico,
                'provincia' => $struttura->posizione->provincia,
                'via' => $struttura->posizione->via,
            ],
            'recapiti' => $struttura->recapiti->map(function ($recapito) {
                return [
                    'email' => $recapito->email,
                    'telefono' => $recapito->telefono,
                ];
            }),
        ]);
    }

    public function addStrutturaPreferita(Request $request, $id_struttura)
    {
        $user = $request->user();
        $id_utente = $user->id;

        try {
            DB::beginTransaction();

            $struttura_preferita = new \App\Models\StrutturaPreferita();
            $struttura_preferita->id_struttura_preferita = Str::uuid();
            $struttura_preferita->id_struttura = $id_struttura;
            $struttura_preferita->id_utente = $id_utente;
            $struttura_preferita->time_modifica = now();
            $struttura_preferita->record_attivo = 1;
            $struttura_preferita->save();

            DB::commit();

            return response()->json(['message' => 'Struttura aggiunta tra i preferiti'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Errore aggiunta struttura tra i preferiti: ", $e->getMessage());
            return response()->json(['message' => "Errore durante l'aggiunta della struttura tra i preferiti"], 500);
        }
    }
}
