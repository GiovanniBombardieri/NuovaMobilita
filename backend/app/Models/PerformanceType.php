<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceType extends Model
{
    protected $table = 'performance_type';
    protected $primaryKey = 'performance_type_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'performance_type_id',
        'type',
        'title',
        'description',
        'change_time',
        'active_record',
    ];

    public function performance()
    {
        return $this->hasMany(Performance::class, 'performance_type_id', 'performance_type_id');
    }
}
