<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posizione extends Model
{
    protected $table = 'posizione';
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

    public $timestamps = FALSE;

    public function struttura()
    {
        return $this->hasOne(Struttura::class, 'id_posizione', 'id_posizione');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id_posizione', 'id_posizione');
    }
}
