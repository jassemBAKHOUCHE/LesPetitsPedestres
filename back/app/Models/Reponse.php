<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Question;

class Reponse extends Model
{
    protected $fillable = [
        'question_id', 
        'est_vrai',
        'reponse'
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }
}
