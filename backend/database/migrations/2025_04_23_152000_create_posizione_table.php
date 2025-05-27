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
            $table->string('comune', 100)->nullable();
            $table->char('provincia', 2)->nullable();
            $table->string('via', 100)->nullable();
            $table->string('numero_civico', 10)->nullable();
            $table->char('cap', 5)->nullable();
            $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('record_attivo')->default(1);

            // $table->foreign('id_struttura')->references('id_struttura')->on('struttura')->onDelete('cascade');
            // $table->foreign('id_utente')->references('id')->on('users')->onDelete('cascade');
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
