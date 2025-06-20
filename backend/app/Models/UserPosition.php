<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPosition extends Model
{
    protected $table = 'user_position';
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
}
