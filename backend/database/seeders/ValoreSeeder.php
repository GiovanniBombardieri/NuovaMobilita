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

        DB::table('value')->insert(array(
            array(
                'value_id' => Str::uuid(),
                'numerical_value' => '50',
                'validity_start' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'validity_end' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'value_id' => Str::uuid(),
                'numerical_value' => '60',
                'validity_start' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'validity_end' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'value_id' => Str::uuid(),
                'numerical_value' => '55',
                'validity_start' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'validity_end' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'value_id' => Str::uuid(),
                'numerical_value' => '70',
                'validity_start' => Carbon::create(2025, 05, 11, 0, 0, 0),
                'validity_end' => Carbon::create(2099, 12, 31, 23, 59, 59),
                'change_time' => $now,
                'active_record' => 1,
            ),
        ));
    }
}
