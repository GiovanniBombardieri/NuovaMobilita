<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Structure;
use App\Models\PreferredStructure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StructureController extends Controller
{
    public function getPaginatedStructures(Request $request)
    {
        $structures = User::whereNotNull('structure_id')
            ->with(['structure.position'])
            ->paginate(4);

        return response()->json($structures);
    }

    public function getStructures(Request $request)
    {
        $structures = Structure::where('active_record', 1)
            ->with('position')
            ->get();
        return response()->json(['data' => $structures]);
    }

    public function getStructurePerformances($structure_id)
    {
        $structure = Structure::with('performance.performanceType', 'performance.value')->find($structure_id);

        if (!$structure) {
            return response()->json(['message' => 'Structure not found'], 404);
        }

        return response()->json([
            'structure' => $structure->corporate,
            'performance' => $structure->performance
        ]);
    }

    public function getStructureDetail($structure_id)
    {
        $structure = Structure::with(['contact', 'position'])->find($structure_id);

        if (!$structure) {
            return response()->json(['message' => 'Structure not found'], 404);
        }

        return response()->json([
            'structure' => [
                'structure_id' => $structure->structure_id,
                'corporate' => $structure->corporate,
            ],
            'position' => [
                'cap' => $structure->position->cap,
                'city' => $structure->position->city,
                'civic_number' => $structure->position->civic_number,
                'province' => $structure->position->province,
                'street' => $structure->position->street,
            ],
            'contact' => $structure->contact->map(function ($contact) {
                return [
                    'email' => $contact->mail,
                    'phone' => $contact->phone,
                ];
            }),
        ]);
    }

    public function addPreferredStructure(Request $request, $structure_id)
    {
        $user = $request->user();
        $user_id = $user->id;

        try {
            DB::beginTransaction();

            $preferred_structure = new \App\Models\PreferredStructure();
            $preferred_structure->preferred_structure_id = Str::uuid();
            $preferred_structure->structure_id = $structure_id;
            $preferred_structure->user_id = $user_id;
            $preferred_structure->change_time = now();
            $preferred_structure->active_record = 1;
            $preferred_structure->save();

            DB::commit();

            return response()->json(['message' => 'Added structure to favorites'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error during the addition of the structure among the favorites: ", $e->getMessage());
            return response()->json(['message' => "Error during the addition of the structure among the favorites"], 500);
        }
    }

    public function getPreferredStructures(Request $request)
    {
        $user = $request->user();
        $user_id = $user->id;

        $preferredStructure = PreferredStructure::where('active_record', 1)
            ->where('user_id', $user_id)
            ->with(['structure.position', 'structure.contact'])
            ->get();

        $result = $preferredStructure->map(function ($item) {
            $structure = $item->structure;

            return [
                'structure' => [
                    'structure_id' => $structure->structure_id ?? null,
                    'corporate' => $structure->corporate ?? null,
                ],
                'position' => [
                    'cap' => $structure->position->cap ?? null,
                    'city' => $structure->position->city ?? null,
                    'civic_number' => $structure->position->civic_number ?? null,
                    'province' => $structure->position->province ?? null,
                    'street' => $structure->position->street ?? null,
                ],
                'contact' => $structure->contact->map(function ($contact) {
                    return [
                        'email' => $contact->email,
                        'phone' => $contact->phone,
                    ];
                }),

            ];
        });

        return response()->json([
            'data' => $result
        ]);
    }

    public function removePreferredStructure(Request $request, $structure_id)
    {
        $user = $request->user();
        $user_id = $user->id;

        $preferred_structure = PreferredStructure::where('structure_id', $structure_id)
            ->where('user_id', $user_id)
            ->first();

        if (!$preferred_structure) {
            return response()->json(['message' => 'Preferred structure not found'], 404);
        }

        $preferred_structure->active_record = 0;
        $preferred_structure->save();

        return response()->json(['message' => 'Favorite structure successfully removed'], 201);
    }
}
