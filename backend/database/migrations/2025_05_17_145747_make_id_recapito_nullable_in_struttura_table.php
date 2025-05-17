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
        Schema::table('struttura', function (Blueprint $table) {
            // $table->dropForeign(['id_recapito']);
            $table->uuid('id_recapito')->nullable()->change();
            $table->foreign('id_recapito')->references('id_recapito')->on('recapito')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('struttura', function (Blueprint $table) {
            $table->dropForeign(['id_recapito']);
            $table->uuid('id_recapito')->nullable(false)->change();
            $table->foreign('id_recapito')->references('id_recapito')->on('recapito')->onDelete('cascade');
        });
    }
};
