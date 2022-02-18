<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parish extends Model
{
    use HasFactory;

    protected $table = 'parishes';

    protected $fillable = [ 'name' ];


    public function communities()
    {
        return $this->belongsToMany(Community::class, 'community_parish');
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }


    public function applications()
    {
        return $this->hasManyThrough(Application::class, Person::class);
    }
}
