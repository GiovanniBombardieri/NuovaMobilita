<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Struttura extends Model
{
    protected $table = 'struttura';
    protected $primaryKey = 'id_struttura';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'id_struttura',
        'id_posizione',
        'id_sito_web',
        'id_recapito',
        'ragione_sociale',
        'time_modifica',
        'record_attivo',
    ];

    // Relazioni con le altre tabelle

    public function user()
    {
        return $this->hasOne(User::class, 'id_struttura', 'id_struttura');
    }

    public function posizione()
    {
        return $this->belongsTo(Posizione::class, 'id_posizione', 'id_posizione');
    }

    public function sitoWeb()
    {
        return $this->belongsTo(SitoWeb::class, 'id_sito_web', 'id_sito_web');
    }

    public function recapiti()
    {
        return $this->hasMany(Recapito::class, 'id_struttura', 'id_struttura');
    }
}
