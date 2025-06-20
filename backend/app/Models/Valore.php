<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Valore extends Model
{
    protected $table = 'valore';
    protected $primaryKey = 'id_valore';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'id_valore',
        'valore_numerico',
        'inizio_validita',
        'fine_validita',
        'time_modifica',
        'record_attivo',
    ];

    // Relazioni con le altre tabelle

    public function prestazione()
    {
        return $this->hasOne(Performance::class, 'id_valore', 'id_valore');
    }
}
