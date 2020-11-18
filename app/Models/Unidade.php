<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    public $timestamps = true;
    
    protected $fillable = ['nome'];

    public function turmas(){
        return $this->hasMany(Turma::class, 'unidade_id', 'id');
    }
}
