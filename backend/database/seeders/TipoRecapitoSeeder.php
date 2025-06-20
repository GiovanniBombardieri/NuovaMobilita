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

        DB::table('contact_type')->insert([
            [
                'contact_type_id' => '0000004a-0000-0000-0000-000000000001',
                'description' => 'email',
                'change_time' => $now,
                'active_record' => 1,
            ],
            [
                'contact_type_id' => '0000004e-0000-0000-0000-000000000002',
                'description' => 'phone',
                'change_time' => $now,
                'active_record' => 1,
            ],
        ]);
    }
}
