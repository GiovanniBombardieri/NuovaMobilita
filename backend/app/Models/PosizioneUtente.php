<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PosizioneUtente extends Model
{
    protected $table = 'posizione_user';
    protected $primaryKey = 'id_posizione';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'id_posizione',
        'comune',
        'provincia',
        'via',
        'numero_civico',
        'cap',
        'time_modifica',
        'record_attivo',
    ];
}
