<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Struttura;
use App\Models\Position;
use App\Models\Performance;
use App\Models\Recapito;
use App\Models\TipoPrestazione;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PrestazioneController extends Controller
{
    public function getPrestazioni(Request $request)
    {
        $user = $request->user();
        $struttura = $user->struttura;

        $prestazioni = $struttura
            ?->prestazioni()
            ->where('record_attivo', 1)
            ->with(['tipoPrestazione', 'valore'])
            ->paginate($user->ruolo === 'struttura' ? 7 : 4);

        return response()->json($prestazioni);
    }

    public function getPrestazioniSingola(Request $request, $id_prestazione)
    {
        $user = $request->user();
        $struttura = $user->struttura;

        $prestazione = $struttura
            ?->prestazioni()
            ->where('id_prestazione', $id_prestazione)
            ->where('record_attivo', 1)
            ->with(['tipoPrestazione', 'valore'])
            ->first();

        if (!$prestazione) {
            return response()->json(['message' => 'Performance non trovata'], 404);
        }

        return response()->json($prestazione);
    }

    public function updatePrestazione(Request $request, $id_prestazione)
    {
        $prestazione = Performance::findOrFail($id_prestazione);
        $prestazione->descrizione_personalizzata = $request->input('descrizione');
        $prestazione->save();

        $prestazione->tipoPrestazione->titolo = $request->input('titolo');
        $prestazione->tipoPrestazione->tipologia = $request->input('tipologia') === 'Psicologica' ? 'P' : 'M';
        $prestazione->tipoPrestazione->time_modifica = now();
        $prestazione->tipoPrestazione->save();

        $prestazione->valore->valore_numerico = $request->input('costo');
        $prestazione->valore->time_modifica = now();
        $prestazione->valore->save();

        return response()->json(['message' => 'Performance aggiornata con successo']);
    }

    public function createPrestazione(Request $request)
    {
        $user = $request->user();
        $struttura = $user?->struttura;

        if (!$struttura) {
            return response()->json(['message' => 'Struttura non trovata'], 404);
        }

        $tipo_prestazione = TipoPrestazione::where('id_tipo_prestazione', $request->id_tipo_prestazione)->first();

        if ($request->id_tipo_prestazione) {
            $validated = $request->validate([
                'titolo' => 'required|string|max:255',
                'descrizione' => 'required|string',
                'tipologia' => 'required|string|size:1|in:P,M',
                'costo' => 'required|numeric|min:0',
            ]);

            try {
                DB::beginTransaction();

                $valore = new \App\Models\Valore();
                $valore->id_valore = Str::uuid();
                $valore->valore_numerico = $validated['costo'];
                $valore->inizio_validita = now();
                $valore->fine_validita = '2099-12-31 23:59:59';
                $valore->time_modifica = now();
                $valore->record_attivo = 1;
                $valore->save();

                $prestazione = new \App\Models\Performance();
                $prestazione->id_prestazione = Str::uuid();
                $prestazione->id_tipo_prestazione = $tipo_prestazione->id_tipo_prestazione;
                $prestazione->id_struttura = $struttura->id_struttura;
                $prestazione->id_valore = $valore->id_valore;
                $validated['descrizione'] !== $tipo_prestazione->descrizione ? $prestazione->descrizione_personalizzata = $validated['descrizione'] : null;
                $prestazione->time_modifica = now();
                $prestazione->record_attivo = 1;
                $prestazione->save();

                DB::commit();

                return response()->json(['message' => 'Performance creata con successo'], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error("Errore creazione prestazione: " . $e->getMessage());
                return response()->json(['message' => 'Errore durante la creazione della prestazione'], 500);
            }
        } else {
            $validated = $request->validate([
                'titolo' => 'required|string|max:255',
                'descrizione' => 'required|string',
                'tipologia' => 'required|string|size:1|in:P,M',
                'costo' => 'required|numeric|min:0',
            ]);

            try {
                DB::beginTransaction();

                $tipo = new \App\Models\TipoPrestazione();
                $tipo->id_tipo_prestazione = Str::uuid();
                $tipo->tipologia = $validated['tipologia'];
                $tipo->titolo = $validated['titolo'];
                $tipo->descrizione = $validated['descrizione'];
                $tipo->time_modifica = now();
                $tipo->record_attivo = 1;
                $tipo->save();

                $valore = new \App\Models\Valore();
                $valore->id_valore = Str::uuid();
                $valore->valore_numerico = $validated['costo'];
                $valore->inizio_validita = now();
                $valore->fine_validita = '2099-12-31 23:59:59';
                $valore->time_modifica = now();
                $valore->record_attivo = 1;
                $valore->save();

                $prestazione = new \App\Models\Performance();
                $prestazione->id_prestazione = Str::uuid();
                $prestazione->id_tipo_prestazione = $tipo->id_tipo_prestazione;
                $prestazione->id_struttura = $struttura->id_struttura;
                $prestazione->id_valore = $valore->id_valore;
                $prestazione->descrizione_personalizzata = null;
                $prestazione->time_modifica = now();
                $prestazione->record_attivo = 1;
                $prestazione->save();

                DB::commit();

                return response()->json(['message' => 'Performance creata con successo'], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error("Errore creazione prestazione: " . $e->getMessage());
                return response()->json(['message' => 'Errore durante la creazione della prestazione'], 500);
            }
        }


        try {
            DB::beginTransaction();

            $tipo = new \App\Models\TipoPrestazione();
            $tipo->id_tipo_prestazione = Str::uuid();
            $tipo->tipologia = $validated['tipologia'];
            $tipo->titolo = $validated['titolo'];
            $tipo->descrizione = $tipo_prestazione->descrizione;
            $tipo->time_modifica = now();
            $tipo->record_attivo = 1;
            $tipo->save();

            $valore = new \App\Models\Valore();
            $valore->id_valore = Str::uuid();
            $valore->valore_numerico = $validated['costo'];
            $valore->inizio_validita = now();
            $valore->fine_validita = '2099-12-31 23:59:59';
            $valore->time_modifica = now();
            $valore->record_attivo = 1;
            $valore->save();

            $prestazione = new \App\Models\Performance();
            $prestazione->id_prestazione = Str::uuid();
            $prestazione->id_tipo_prestazione = $tipo->id_tipo_prestazione;
            $prestazione->id_struttura = $struttura->id_struttura;
            $prestazione->id_valore = $valore->id_valore;
            $validated['descrizione'] !== $tipo_prestazione->descrizione ? $prestazione->descrizione_personalizzata = $validated['descrizione'] : null;
            $prestazione->time_modifica = now();
            $prestazione->record_attivo = 1;
            $prestazione->save();

            DB::commit();

            return response()->json(['message' => 'Performance creata con successo'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Errore creazione prestazione: " . $e->getMessage());
            return response()->json(['message' => 'Errore durante la creazione della prestazione'], 500);
        }
    }

    public function deletePrestazione($id_prestazione)
    {
        $prestazione = Performance::findOrFail($id_prestazione);
        $prestazione->record_attivo = 0;
        // $prestazione?->valore->record_attivo = 0;
        $prestazione->save();


        return response()->json(['message' => 'Performance eliminata con successo'], 201);
    }

    public function getTipoPrestazioni(Request $request)
    {
        $tipo_prestazioni = TipoPrestazione::where('record_attivo', 1)->paginate(6);
        return response()->json($tipo_prestazioni);
    }

    public function getTipoPrestazioneSingola($id_tipo_prestazione)
    {
        $tipo_prestazione = TipoPrestazione::where('id_tipo_prestazione', $id_tipo_prestazione)->first();
        return response()->json($tipo_prestazione);
    }
}
