<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebSite extends Model
{
    protected $table = 'web_site';
    protected $primaryKey = 'web_site_id';
    public $incrementing = FALSE;
    protected $keyType = 'string';

    protected $fillable = [
        'web_site_id',
        'url',
        'change_time',
        'active_record',
    ];

    public $timestamps = FALSE;

    public function structure()
    {
        return $this->hasOne(Structure::class, 'web_site_id', 'web_site_id');
    }
}
