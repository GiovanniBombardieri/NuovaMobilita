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
        Schema::table('prestazioni', function (Blueprint $table) {
            $table->longText('descrizione_personalizzata')->after('id_valore')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prestazioni', function (Blueprint $table) {
            $table->dropColumn('descrizione_personalizzata');
        });
    }
};
