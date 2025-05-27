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
    Schema::create('struttura', function (Blueprint $table) {
      $table->string('id_struttura', 36)->primary();

      $table->string('id_posizione', 36);
      $table->string('id_sito_web', 36)->nullable();
      $table->string('id_recapito', 36)->nullable();

      $table->text('ragione_sociale');
      $table->dateTime('time_modifica')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
      $table->tinyInteger('record_attivo')->default(1);

      // Foreign keys
      // $table->foreign('id_posizione')->references('id_posizione')->on('posizione')->onDelete('cascade');
      // $table->foreign('id_sito_web')->references('id_sito_web')->on('sito_web')->onDelete('cascade');
      // $table->foreign('id_recapito')->references('id_recapito')->on('recapito')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('strutturas');
  }
};
