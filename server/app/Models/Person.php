<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'people';

    protected $fillable = [ 'dni', 'name', 'address', 'phone', 'community_id', 'parish_id' , 'sector_id', 'street_id' ];

    protected $appends = [
        'full_address'
    ];

    public function getFullAddressAttribute()
    {
        return "{$this->parish->name}, {$this->community->name}, {$this->address}";
    }

    public function parish()
    {
        return $this->belongsTo(Parish::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }

    public function street()
    {
        return $this->belongsTo(Street::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
