<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoPrestazione extends Model
{
    protected $table = 'tipo_prestazione';
    protected $primaryKey = 'id_tipo_prestazione';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'id_tipo_prestazione',
        'tipologia',
        'titolo',
        'descrizione',
        'time_modifica',
        'record_attivo',
    ];

    // Relazioni con le altre tabelle

    public function prestazione()
    {
        return $this->hasMany(Prestazione::class, 'id_tipo_prestazione', 'id_tipo_prestazione');
    }
}
