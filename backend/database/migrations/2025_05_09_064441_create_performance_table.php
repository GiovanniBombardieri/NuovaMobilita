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
        Schema::create('performance', function (Blueprint $table) {
            $table->string('performance_id', 36)->primary();
            $table->string('performance_type_id', 36);
            $table->string('structure_id', 36);
            $table->string('value_id', 36);
            $table->longText('personalized_description')->nullable();
            $table->dateTime('change_time')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('active_record')->default(1);

            // Foreign keys
            // $table->foreign('performance_type_id')->references('performance_type_id')->on('performance_type')->onDelete('cascade');
            // $table->foreign('structure_id')->references('structure_id')->on('structure')->onDelete('cascade');
            // $table->foreign('value_id')->references('value_id')->on('value')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance');
    }
};
