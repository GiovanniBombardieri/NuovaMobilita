<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeoCodingController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['error' => 'Missing query'], 400);
        }

        $response = Http::withHeaders([
            'User-Agent' => 'nuova-mobilita/1.0 (g.bombardieri06@gmail.com)'
        ])->get('https://nominatim.openstreetmap.org/search', [
            'format' => 'json',
            'q' => $query,
        ]);


        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch data'], 500);
    }
}
