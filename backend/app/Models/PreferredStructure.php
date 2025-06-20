<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferredStructure extends Model
{
    protected $table = 'preferred_structures';
    protected $primaryKey = 'preferred_structure_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'preferred_structure_id',
        'structure_id',
        'user_id',
        'change_time',
        'active_record',
    ];

    public function structure()
    {
        return $this->belongsTo(Structure::class, 'structure_id');
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
