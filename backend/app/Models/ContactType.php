<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactType extends Model
{
    protected $table = 'contact_types';
    protected $primaryKey = 'contact_type_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'contact_type_id',
        'description',
        'change_time',
        'active_record',
    ];

    public $timestamps = FALSE;

    public function contact()
    {
        $this->hasMany(Contact::class, 'contact_type_id', 'contact_type_id');
    }
}
