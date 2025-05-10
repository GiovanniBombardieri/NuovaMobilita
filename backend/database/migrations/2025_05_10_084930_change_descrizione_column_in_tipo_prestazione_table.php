<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tipo_prestazione', function (Blueprint $table) {
            $table->text('descrizione')->change();
        });
    }

    public function down(): void
    {
        Schema::table('tipo_prestazione', function (Blueprint $table) {
            $table->string('descrizione', 255)->change();
        });
    }
};
