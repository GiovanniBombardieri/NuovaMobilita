<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TipoRecapitoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('tipo_recapito')->insert([
            [
                'id_tipo_recapito' => '0000004a-0000-0000-0000-000000000001',
                'descrizione' => 'email',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ],
            [
                'id_tipo_recapito' => '0000004e-0000-0000-0000-000000000002',
                'descrizione' => 'telefono',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ],
        ]);
    }
}
