<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrutturaPreferita extends Model
{
    protected $table = 'strutture_preferite';
    protected $primaryKey = 'id_struttura_preferita';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'id_struttura_preferita',
        'id_struttura',
        'id_utente',
        'time_modifica',
        'record_attivo',
    ];

    // Relazioni con le altre tabelle
    public function struttura()
    {
        return $this->belongsTo(Struttura::class, 'id_struttura');
    }


    public function utente()
    {
        return $this->belongsTo(User::class, 'id_utente');
    }
}
