<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PrestazioniSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('performance')->insert(array(
            array(
                'performance_id' => Str::uuid(),
                'performance_type_id' => '002662c0-8aee-47bd-b4ae-b9ecf34b544e',
                'structure_id' => '6ebcad24-7552-4ca0-8d66-31ebf6cff8c0',
                'value_id' => '1d8abe90-9c77-4ecf-b5be-e0a00ba71950',
                'change_time' => $now,
                'active_record' => 1
            ),
            array(
                'performance_id' => Str::uuid(),
                'performance_type_id' => '4e7f0c0f-2d84-43df-b43c-4dc311b45643',
                'structure_id' => '6ebcad24-7552-4ca0-8d66-31ebf6cff8c0',
                'value_id' => '834191a4-442c-4b92-b6bf-a76444aff6bd',
                'change_time' => $now,
                'active_record' => 1
            ),
            array(
                'performance_id' => Str::uuid(),
                'performance_type_id' => 'a85b13f8-215c-44e4-86f4-17093e40cb3c',
                'structure_id' => '6ebcad24-7552-4ca0-8d66-31ebf6cff8c0',
                'value_id' => '87ba6fda-8bce-49d2-84ab-f3e5e7cb656f',
                'change_time' => $now,
                'active_record' => 1
            ),
            array(
                'performance_id' => Str::uuid(),
                'performance_type_id' => 'f92fab63-aa4e-49bc-8465-fb884081cceb',
                'structure_id' => '6ebcad24-7552-4ca0-8d66-31ebf6cff8c0',
                'value_id' => '8e8f2f94-526e-4246-a981-7d63e6dc728f',
                'change_time' => $now,
                'active_record' => 1
            ),
        ));
    }
}
