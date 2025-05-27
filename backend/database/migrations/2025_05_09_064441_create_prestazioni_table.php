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
        Schema::create('prestazioni', function (Blueprint $table) {
            $table->string('id_prestazione', 36)->primary();
            $table->string('id_tipo_prestazione', 36);
            $table->string('id_struttura', 36);
            $table->string('id_valore', 36);
            $table->longText('descrizione_personalizzata')->nullable();
            $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('record_attivo')->default(1);

            // Foreign keys
            // $table->foreign('id_tipo_prestazione')->references('id_tipo_prestazione')->on('tipo_prestazione')->onDelete('cascade');
            // $table->foreign('id_struttura')->references('id_struttura')->on('struttura')->onDelete('cascade');
            // $table->foreign('id_valore')->references('id_valore')->on('valore')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestazioni');
    }
};
