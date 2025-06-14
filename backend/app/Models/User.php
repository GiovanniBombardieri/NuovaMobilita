<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'cognome',
        'email',
        'password',
        'indirizzo',
        'telefono',
        'ruolo',
        'record_attivo',
        'id_struttura',
        'id_posizione',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id_struttura' => 'string',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function struttura()
    {
        return $this->hasOne(Struttura::class, 'id_struttura', 'id_struttura');
    }

    public function posizione_utente()
    {
        return $this->hasOne(Posizione::class, 'id_posizione', 'id_posizione');
    }

    public function strutturaPreferita()
    {
        return $this->hasMany(StrutturaPreferita::class, 'id_utente');
    }
}
