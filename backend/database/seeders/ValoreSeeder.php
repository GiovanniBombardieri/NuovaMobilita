<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ValoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('valore')->insert(array(
            array(
                'id_valore' => Str::uuid(),
                'valore_numerico' => '50',
                'inizio_validita' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'fine_validita' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_valore' => Str::uuid(),
                'valore_numerico' => '60',
                'inizio_validita' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'fine_validita' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_valore' => Str::uuid(),
                'valore_numerico' => '55',
                'inizio_validita' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'fine_validita' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_valore' => Str::uuid(),
                'valore_numerico' => '70',
                'inizio_validita' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'fine_validita' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
        ));
    }
}
