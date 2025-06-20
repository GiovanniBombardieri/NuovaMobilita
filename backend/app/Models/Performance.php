<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Performance extends Model
{
    protected $table = 'performances';
    protected $primaryKey = 'performance_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'performance_id',
        'performance_type_id',
        'structure_id',
        'value_id',
        'change_time',
        'active_record',
    ];

    // Relazioni con le altre tabelle
    public function structure()
    {
        return $this->belongsTo(Structure::class, 'structure_id', 'structure_id');
    }

    public function performanceType()
    {
        return $this->belongsTo(PerformanceType::class, 'performance_type_id', 'performance_type_id');
    }

    public function value()
    {
        return $this->hasOne(Value::class, 'value_id', 'value_id');
    }
}
