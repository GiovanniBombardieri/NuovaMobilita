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
    Schema::create('structure', function (Blueprint $table) {
      $table->string('structure_id', 36)->primary();

      $table->string('position_id', 36);
      $table->string('web_site_id', 36)->nullable();
      $table->string('contact_id', 36)->nullable();

      $table->text('corporate');
      $table->dateTime('change_time')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
      $table->tinyInteger('active_record')->default(1);

      // Foreign keys
      // $table->foreign('position_id')->references('position_id')->on('position')->onDelete('cascade');
      // $table->foreign('web_site_id')->references('web_site_id')->on('web_site')->onDelete('cascade');
      // $table->foreign('contact_id')->references('contact_id')->on('contact')->onDelete('cascade');
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
