<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posizione', function (Blueprint $table) {
            $table->string('id_posizione', 36)->primary();
            $table->string('comune', 100);
            $table->char('provincia', 2);
            $table->string('via', 100);
            $table->string('numero_civico', 10);
            $table->char('cap', 5);
            $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('record_attivo')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posizione');
    }
};
