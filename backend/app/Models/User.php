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
        'surname',
        'email',
        'password',
        'address',
        'phone',
        'role',
        'active_record',
        'structure_id',
        'position_id',
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
            'structure_id' => 'string',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function structure()
    {
        return $this->hasOne(Structure::class, 'structure_id', 'structure_id');
    }

    public function user_position()
    {
        return $this->hasOne(Position::class, 'position_id', 'position_id');
    }

    public function preferredStructure()
    {
        return $this->hasMany(PreferredStructure::class, 'user_id', 'user_id');
    }
}
