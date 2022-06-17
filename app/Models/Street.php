<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Street extends Model
{
    use HasFactory;

    protected $table = 'streets';

    protected $fillable = [ 'name' ];

    //protected $appends = ['sector_names'];

    public function sectors()
    {
        return $this->belongsToMany(Sector::class, 'street_sector');
    }

    public function applications()
    {
        return $this->hasManyThrough(Application::class, Person::class);
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    // public function getSectorNamesAttribute()
    // {
    //     return $this->sectors()->get()->implode('name', ', ');
    // }
}
