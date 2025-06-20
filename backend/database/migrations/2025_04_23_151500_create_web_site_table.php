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
        Schema::create('web_site', function (Blueprint $table) {
            $table->string('web_site_id', 36)->primary();
            $table->string('url');
            $table->dateTime('change_time')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('active_record')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('web_site');
    }
};
