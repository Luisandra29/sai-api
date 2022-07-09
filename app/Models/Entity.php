<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    protected $table = 'entities';

    protected $fillable = [ 'name' ];

    public function users()
    {
       return $this->hasMany(User::class);
    }

    public function applications()
    {
        return $this->hasManyThrough(Application::class, User::class);
    }
}
