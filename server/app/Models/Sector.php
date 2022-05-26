<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    use HasFactory;

    protected $table = 'sectors';

    protected $fillable = [ 'name','community_id' ];

    protected $appends = ['community_names'];


    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function streets()
    {
        return $this->belongsToMany(Street::class, 'street_sector');
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function applications()
    {
        return $this->hasManyThrough(Application::class, Person::class);
    }

    public function getCommunityNamesAttribute()
    {
        return $this->community()->get()->implode('name', ', ');

        //$this->load('communities');
    }
}
