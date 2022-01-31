<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $table = 'communities';

    protected $fillable = [ 'name' ];

	protected $appends = ['parish_names'];

    public function parishes()
    {
        return $this->belongsToMany(Parish::class, 'community_parish');
    }

    public function applications()
    {
        return $this->hasManyThrough(Application::class, Person::class);
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function getParishNamesAttribute()
    {
        return $this->parishes()->get()->implode('name', ', ');
    }
}
