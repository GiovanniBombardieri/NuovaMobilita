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
        Schema::table('tipo_prestazione', function (Blueprint $table) {
            $table->string('titolo')->after('id_tipo_prestazione');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tipo_prestazione', function (Blueprint $table) {
            $table->dropColumn('titolo');
        });
    }
};
