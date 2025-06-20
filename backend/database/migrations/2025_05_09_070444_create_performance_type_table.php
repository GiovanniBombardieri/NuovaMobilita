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
        Schema::create('performance_type', function (Blueprint $table) {
            $table->string('performance_type_id', 36)->primary();
            $table->string('type', 1);
            $table->string('title');
            $table->text('description');
            $table->dateTime('change_time')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('active_record')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_type');
    }
};
