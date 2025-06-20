<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $table = 'value';
    protected $primaryKey = 'value_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'value_id',
        'numerical_value',
        'validity_start',
        'validity_end',
        'change_time',
        'active_record',
    ];

    public function performance()
    {
        return $this->hasOne(Performance::class, 'value_id', 'value_id');
    }
}
