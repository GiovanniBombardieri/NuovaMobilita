<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recapito extends Model
{
    protected $table = 'recapito';
    protected $primaryKey = 'id_recapito';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'id_recapito',
        'id_tipo_recapito',
        'telefono',
        'email',
        'time_modifica',
        'record_attivo',
    ];

    public $timestamps = FALSE;

    public function tipoRecapito()
    {
        return $this->belongsTo(TipoRecapito::class, 'id_tipo_recapito', 'id_tipo_recapito');
    }

    public function struttura()
    {
        return $this->belongsTo(Struttura::class, 'id_struttura', 'id_struttura');
    }
}
