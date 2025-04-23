<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoRecapito extends Model
{
    protected $table = 'tipo_recapito';
    protected $primaryKey = 'id_tipo_recapito';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'id_tipo_recapito',
        'descrizione',
        'time_modifica',
        'record_attivo',
    ];

    public $timestamps = FALSE;

    public function recapito()
    {
        $this->hasMany(Recapito::class, 'id_tipo_recapito', 'id_tipo_recapito');
    }
}
