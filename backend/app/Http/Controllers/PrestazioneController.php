<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use App\Models\Performance;
use App\Models\PerformanceType;

=======
use App\Models\User;
use App\Models\Struttura;
use App\Models\Position;
use App\Models\Performance;
use App\Models\Contact;
use App\Models\PerformanceType;
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PrestazioneController extends Controller
{
    public function getPrestazioni(Request $request)
    {
        $user = $request->user();
        $structure = $user->structure;

        $perfomances = $structure
            ?->perfomances()
            ->where('active_record', 1)
            ->with(['performanceType', 'value'])
            ->paginate($user->role === 'structure' ? 7 : 4);

        return response()->json($perfomances);
    }

<<<<<<< HEAD
    public function getPrestazioniSingola(Request $request, $perfomance_id)
=======
    public function SinglePerformance(Request $request, $id_prestazione)
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
    {
        $user = $request->user();
        $structure = $user->structure;

        $perfomance = $structure
            ?->perfomances()
            ->where('perfomance_id', $perfomance_id)
            ->where('active_record', 1)
            ->with(['performanceType', 'value'])
            ->first();

<<<<<<< HEAD
        if (!$perfomance) {
            return response()->json(['message' => 'Perfomance not found'], 404);
=======
        if (!$prestazione) {
            return response()->json(['message' => 'Performance non trovata'], 404);
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
        }

        return response()->json($perfomance);
    }

    public function updatePrestazione(Request $request, $perfomance_id)
    {
<<<<<<< HEAD
        $perfomance = Performance::findOrFail($perfomance_id);
        $perfomance->personalized_description = $request->input('description');
        $perfomance->save();
=======
        $prestazione = Performance::findOrFail($id_prestazione);
        $prestazione->descrizione_personalizzata = $request->input('descrizione');
        $prestazione->save();
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62

        $perfomance->performanceType->title = $request->input('title');
        $perfomance->performanceType->type = $request->input('type') === 'Psychological' ? 'P' : 'M';
        $perfomance->performanceType->change_time = now();
        $perfomance->performanceType->save();

        $perfomance->value->numerical_value = $request->input('price');
        $perfomance->value->change_time = now();
        $perfomance->value->save();

<<<<<<< HEAD
        return response()->json(['message' => 'Successful updated performance']);
=======
        return response()->json(['message' => 'Performance aggiornata con successo']);
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
    }

    public function createPrestazione(Request $request)
    {
        $user = $request->user();
        $structure = $user?->structure;

        if (!$structure) {
            return response()->json(['message' => 'Structure not found'], 404);
        }

<<<<<<< HEAD
        $performance_type = PerformanceType::where('performance_type_id', $request->performance_type_id)->first();
=======
        $tipo_prestazione = PerformanceType::where('id_tipo_prestazione', $request->id_tipo_prestazione)->first();
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62

        if ($request->performance_type_id) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'type' => 'required|string|size:1|in:P,M',
                'price' => 'required|numeric|min:0',
            ]);

            try {
                DB::beginTransaction();

<<<<<<< HEAD
                $value = new \App\Models\Value();
                $value->value_id = Str::uuid();
                $value->numerical_value = $validated['price'];
                $value->start_validity = now();
                $value->end_validity = '2099-12-31 23:59:59';
                $value->change_time = now();
                $value->active_record = 1;
                $value->save();

                $perfomance = new \App\Models\Performance();
                $perfomance->perfomance_id = Str::uuid();
                $perfomance->performance_type_id = $performance_type->performance_type_id;
                $perfomance->structure_id = $structure->structure_id;
                $perfomance->value_id = $value->value_id;
                $validated['description'] !== $performance_type->description ? $perfomance->personalized_description = $validated['description'] : null;
                $perfomance->change_time = now();
                $perfomance->active_record = 1;
                $perfomance->save();

                DB::commit();

                return response()->json(['message' => 'Performance successfully created'], 201);
=======
                $valore = new \App\Models\Value();
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
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error("Performance creation error: " . $e->getMessage());
                return response()->json(['message' => 'Error when creating performance'], 500);
            }
        } else {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'type' => 'required|string|size:1|in:P,M',
                'price' => 'required|numeric|min:0',
            ]);

            try {
                DB::beginTransaction();

<<<<<<< HEAD
                $type = new \App\Models\PerformanceType();
                $type->performance_type_id = Str::uuid();
                $type->type = $validated['type'];
                $type->title = $validated['title'];
                $type->description = $validated['description'];
                $type->change_time = now();
                $type->active_record = 1;
                $type->save();

                $value = new \App\Models\Value();
                $value->value_id = Str::uuid();
                $value->numerical_value = $validated['price'];
                $value->start_validity = now();
                $value->end_validity = '2099-12-31 23:59:59';
                $value->change_time = now();
                $value->active_record = 1;
                $value->save();

                $perfomance = new \App\Models\Performance();
                $perfomance->perfomance_id = Str::uuid();
                $perfomance->performance_type_id = $type->performance_type_id;
                $perfomance->structure_id = $structure->structure_id;
                $perfomance->value_id = $value->value_id;
                $perfomance->personalized_description = null;
                $perfomance->change_time = now();
                $perfomance->active_record = 1;
                $perfomance->save();

                DB::commit();

                return response()->json(['message' => 'Performance successfully created'], 201);
=======
                $tipo = new \App\Models\PerformanceType();
                $tipo->id_tipo_prestazione = Str::uuid();
                $tipo->tipologia = $validated['tipologia'];
                $tipo->titolo = $validated['titolo'];
                $tipo->descrizione = $validated['descrizione'];
                $tipo->time_modifica = now();
                $tipo->record_attivo = 1;
                $tipo->save();

                $valore = new \App\Models\Value();
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
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error("Performance creation error: " . $e->getMessage());
                return response()->json(['message' => 'Error when creating performance'], 500);
            }
        }


        try {
            DB::beginTransaction();

<<<<<<< HEAD
            $type = new \App\Models\PerformanceType();
            $type->performance_type_id = Str::uuid();
            $type->type = $validated['type'];
            $type->title = $validated['title'];
            $type->description = $performance_type->description;
            $type->change_time = now();
            $type->active_record = 1;
            $type->save();

            $value = new \App\Models\Value();
            $value->value_id = Str::uuid();
            $value->numerical_value = $validated['price'];
            $value->start_validity = now();
            $value->end_validity = '2099-12-31 23:59:59';
            $value->change_time = now();
            $value->active_record = 1;
            $value->save();

            $perfomance = new \App\Models\Performance();
            $perfomance->perfomance_id = Str::uuid();
            $perfomance->performance_type_id = $type->performance_type_id;
            $perfomance->structure_id = $structure->structure_id;
            $perfomance->value_id = $value->value_id;
            $validated['description'] !== $performance_type->description ? $perfomance->personalized_description = $validated['description'] : null;
            $perfomance->change_time = now();
            $perfomance->active_record = 1;
            $perfomance->save();

            DB::commit();

            return response()->json(['message' => 'Performance successfully created'], 201);
=======
            $tipo = new \App\Models\PerformanceType();
            $tipo->id_tipo_prestazione = Str::uuid();
            $tipo->tipologia = $validated['tipologia'];
            $tipo->titolo = $validated['titolo'];
            $tipo->descrizione = $tipo_prestazione->descrizione;
            $tipo->time_modifica = now();
            $tipo->record_attivo = 1;
            $tipo->save();

            $valore = new \App\Models\Value();
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
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Errore creazione perfomance: " . $e->getMessage());
            return response()->json(['message' => 'Error when creating performance'], 500);
        }
    }

    public function deletePrestazione($perfomance_id)
    {
<<<<<<< HEAD
        $perfomance = Performance::findOrFail($perfomance_id);
        $perfomance->active_record = 0;
        $perfomance->save();

        return response()->json(['message' => 'Performance successfully eliminated'], 201);
=======
        $prestazione = Performance::findOrFail($id_prestazione);
        $prestazione->record_attivo = 0;
        // $prestazione?->valore->record_attivo = 0;
        $prestazione->save();


        return response()->json(['message' => 'Performance eliminata con successo'], 201);
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
    }

    public function getTipoPrestazioni(Request $request)
    {
<<<<<<< HEAD
        $performance_type = PerformanceType::where('active_record', 1)->paginate(6);
        return response()->json($performance_type);
=======
        $tipo_prestazioni = PerformanceType::where('record_attivo', 1)->paginate(6);
        return response()->json($tipo_prestazioni);
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
    }

    public function getTipoPrestazioneSingola($performance_type_id)
    {
<<<<<<< HEAD
        $performance_type = PerformanceType::where('performance_type_id', $performance_type_id)->first();
        return response()->json($performance_type);
=======
        $tipo_prestazione = PerformanceType::where('id_tipo_prestazione', $id_tipo_prestazione)->first();
        return response()->json($tipo_prestazione);
>>>>>>> 93cec5caf6c48e42fcdb783c5529e51e438ccf62
    }
}
