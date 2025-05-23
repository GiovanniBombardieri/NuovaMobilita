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
}
