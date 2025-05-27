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
        Schema::create('recapito', function (Blueprint $table) {
            $table->string('id_recapito', 36)->primary();
            $table->string('id_struttura', 36);
            $table->string('id_tipo_recapito', 36);
            $table->char('telefono')->nullable();
            $table->string('mail')->nullable();
            $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('record_attivo')->default(1);

            // Foreign keys
            $table->foreign('id_tipo_recapito')->references('id_tipo_recapito')->on('tipo_recapito')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recapito');
    }
};
