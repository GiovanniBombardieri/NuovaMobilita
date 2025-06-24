<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Structure extends Model
{
    protected $table = 'structure';
    protected $primaryKey = 'structure_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    public $timestamps = FALSE;

    protected $fillable = [
        'structure_id',
        'position_id',
        'web_site_id',
        'contact_id',
        'corporate',
        'change_time',
        'active_record',
    ];



    public function user()
    {
        return $this->hasOne(User::class, 'structure_id', 'structure_id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }

    public function sitoWeb()
    {
        return $this->belongsTo(WebSite::class, 'web_site_id', 'web_site_id');
    }

    public function contact()
    {
        return $this->hasMany(Contact::class, 'structure_id', 'structure_id')->where('active_record', 1);
    }

    public function performance()
    {
        return $this->hasMany(Performance::class, 'structure_id', 'structure_id')->where('active_record', 1);
    }

    public function preferredStructure()
    {
        return $this->hasMany(PreferredStructure::class, 'structure_id');
    }
}
