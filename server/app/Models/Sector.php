<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    use HasFactory;

    protected $table = 'sectors';

    protected $fillable = [ 'name','community_id' ];

    public function communities()
    {
        return $this->belongsTo(Community::class);
    }

    public function streets()
    {
        return $this->belongsToMany(Street::class, 'street_sector');
    }
}
