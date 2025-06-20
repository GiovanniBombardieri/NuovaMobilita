<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use App\Models\PerformanceType;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PerformanceController extends Controller
{
    public function getPerformance(Request $request)
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

    public function SinglePerformance(Request $request, $perfomance_id)
    {
        $user = $request->user();
        $structure = $user->structure;

        $perfomance = $structure
            ?->perfomances()
            ->where('perfomance_id', $perfomance_id)
            ->where('active_record', 1)
            ->with(['performanceType', 'value'])
            ->first();

        if (!$perfomance) {
            return response()->json(['message' => 'Perfomance not found'], 404);
        }

        return response()->json($perfomance);
    }

    public function updatePerformance(Request $request, $perfomance_id)
    {
        $perfomance = Performance::findOrFail($perfomance_id);
        $perfomance->personalized_description = $request->input('description');
        $perfomance->save();

        $perfomance->performanceType->title = $request->input('title');
        $perfomance->performanceType->type = $request->input('type') === 'Psychological' ? 'P' : 'M';
        $perfomance->performanceType->change_time = now();
        $perfomance->performanceType->save();

        $perfomance->value->numerical_value = $request->input('price');
        $perfomance->value->change_time = now();
        $perfomance->value->save();

        return response()->json(['message' => 'Successful updated performance']);
    }

    public function createPerformance(Request $request)
    {
        $user = $request->user();
        $structure = $user?->structure;

        if (!$structure) {
            return response()->json(['message' => 'Structure not found'], 404);
        }

        $performance_type = PerformanceType::where('performance_type_id', $request->performance_type_id)->first();

        if ($request->performance_type_id) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'type' => 'required|string|size:1|in:P,M',
                'price' => 'required|numeric|min:0',
            ]);

            try {
                DB::beginTransaction();

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
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error("Performance creation error: " . $e->getMessage());
                return response()->json(['message' => 'Error when creating performance'], 500);
            }
        }


        try {
            DB::beginTransaction();

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
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Errore creazione perfomance: " . $e->getMessage());
            return response()->json(['message' => 'Error when creating performance'], 500);
        }
    }

    public function deletePerformance($perfomance_id)
    {
        $perfomance = Performance::findOrFail($perfomance_id);
        $perfomance->active_record = 0;
        $perfomance->save();

        return response()->json(['message' => 'Performance successfully eliminated'], 201);
    }

    public function getPerformanceType (Request $request)
    {
        $performance_type = PerformanceType::where('active_record', 1)->paginate(6);
        return response()->json($performance_type);
    }

    public function getSinglePerformanceType ($performance_type_id)
    {
        $performance_type = PerformanceType::where('performance_type_id', $performance_type_id)->first();
        return response()->json($performance_type);
    }
}
