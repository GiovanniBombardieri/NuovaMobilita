<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $table = 'position';
    protected $primaryKey = 'position_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'position_id',
        'city',
        'province',
        'street',
        'civic_number',
        'cap',
        'change_time',
        'active_record',
    ];

    public $timestamps = FALSE;

    public function structure()
    {
        return $this->hasOne(Structure::class, 'position_id', 'position_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'position_id', 'position_id');
    }
}
