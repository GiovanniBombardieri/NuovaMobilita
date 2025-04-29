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
        Schema::table('posizione', function (Blueprint $table) {
            $table->string('comune', 100)->nullable()->change();
            $table->char('provincia', 2)->nullable()->change();
            $table->string('via', 100)->nullable()->change();
            $table->string('numero_civico', 10)->nullable()->change();
            $table->char('cap', 5)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posizione', function (Blueprint $table) {
            $table->string('comune', 100)->nullable(false)->change();
            $table->char('provincia', 2)->nullable(false)->change();
            $table->string('via', 100)->nullable(false)->change();
            $table->string('numero_civico', 10)->nullable(false)->change();
            $table->char('cap', 5)->nullable(false)->change();
        });
    }
};
