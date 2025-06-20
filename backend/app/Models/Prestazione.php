<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Performance extends Model
{
    protected $table = 'prestazioni';
    protected $primaryKey = 'id_prestazione';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'id_prestazione',
        'id_tipo_prestazione',
        'id_struttura',
        'id_valore',
        'time_modifica',
        'record_attivo',
    ];

    // Relazioni con le altre tabelle

    public function struttura()
    {
        return $this->belongsTo(Struttura::class, 'id_struttura', 'id_struttura');
    }

    public function tipoPrestazione()
    {
        return $this->belongsTo(TipoPrestazione::class, 'id_tipo_prestazione', 'id_tipo_prestazione');
    }

    public function valore()
    {
        return $this->hasOne(Valore::class, 'id_valore', 'id_valore');
    }
}
