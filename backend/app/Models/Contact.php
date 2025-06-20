<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contact';
    protected $primaryKey = 'contact_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'contact_id',
        'structure_id',
        'contact_type_id',
        'phone',
        'email',
        'change_time',
        'active_record',
    ];

    public $timestamps = FALSE;

    public function contactType()
    {
        return $this->belongsTo(ContactType::class, 'contact_type_id', 'contact_type_id');
    }

    public function structure()
    {
        return $this->belongsTo(Structure::class, 'structure_id', 'structure_id');
    }
}
