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
    public function getStrutture(Request $request)
    {
        $strutture = User::whereNotNull('id_struttura')
            ->with(['struttura.posizione'])
            ->paginate(4);

        return response()->json($strutture);
    }
}
