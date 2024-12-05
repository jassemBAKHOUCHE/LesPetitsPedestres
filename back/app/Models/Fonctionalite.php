<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Fonctionalite extends Model
{
    protected $fillable = [
        "nom",
        "prix"
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
