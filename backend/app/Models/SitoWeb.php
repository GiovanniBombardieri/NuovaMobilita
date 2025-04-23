<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SitoWeb extends Model
{
    protected $table = 'sito_web';
    protected $primaryKey = 'id_sito_web';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'id_sito_web',
        'url',
        'time_modifica',
        'record_attivo',
    ];

    public $timestamps = FALSE;

    public function strutture()
    {
        return $this->hasOne(Struttura::class, 'id_sito_web', 'id_sito_web');
    }
}
