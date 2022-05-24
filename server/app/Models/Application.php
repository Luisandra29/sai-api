<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\NewValue;


class Application extends Model
{
    use HasFactory, NewValue, SoftDeletes;

    protected $table = 'applications';

    protected $fillable = [
        'title',
        'description',
        'num',
        'subcategory_id',
        'state_id',
        'person_id',
        'approved_at'
    ];


    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }


    public function getApprovedAtAttribute($value)
    {
        return Date('d/m/Y', strtotime($value));
    }

    public function getCreatedAtAttribute($value)
    {
        return Date('d/m/Y h:i', strtotime($value));
    }
}
