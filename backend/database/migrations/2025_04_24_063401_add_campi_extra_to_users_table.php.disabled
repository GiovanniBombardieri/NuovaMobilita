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
        Schema::table('users', function (Blueprint $table) {
            $table->string('cognome')->after('name');
            $table->string('indirizzo')->nullable()->after('cognome');
            $table->string('telefono')->nullable()->after('indirizzo');
            $table->string('ruolo')->after('telefono');
            $table->tinyInteger('record_attivo')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cognome', 'indirizzo', 'telefono', 'ruolo', 'record_attivo']);
        });
    }
};
