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
        Schema::create('contact', function (Blueprint $table) {
            $table->string('contact_id', 36)->primary();
            $table->string('structure_id', 36);
            $table->string('contact_type_id', 36);
            $table->char('phone')->nullable();
            $table->string('mail')->nullable();
            $table->dateTime('change_time')->default(DB::raw('CURRENT_TIMESTAMP'))->useCurrent()->useCurrentOnUpdate();
            $table->tinyInteger('active_record')->default(1);

            // Foreign keys
            $table->foreign('contact_type_id')->references('contact_type_id')->on('contact_type')->onDelete('cascade');
            $table->foreign('structure_id')->references('structure_id')->on('structure')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact');
    }
};
