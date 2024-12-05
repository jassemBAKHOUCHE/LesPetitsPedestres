<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reponse;

class Question extends Model
{
    protected $fillable = [
        'question',
    ];

    public function responses() {
        return $this->hasMany(Response::class);
    }
}
