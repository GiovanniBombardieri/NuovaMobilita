<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posizione_user', function (Blueprint $table) {
            $table->string('id_posizione', 36)->primary();
            $table->string('comune', 100)->nullable();
            $table->char('provincia', 2)->nullable();
            $table->string('via', 100)->nullable();
            $table->string('numero_civico', 10)->nullable();
            $table->char('cap', 5)->nullable();
            $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('record_attivo')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posizione_user');
    }
};
