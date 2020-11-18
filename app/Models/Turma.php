<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{   
    public $timestamps = false;
    
    protected $fillable = [
        'unidade_id',
        'nome',
        'vagas',
        'data_inicio'
    ];

    public function alunos(){
        return $this->belongsToMany(Aluno::class, 'aluno_turma', 'turma_id', 'aluno_id');
    }

    public function unidade(){
        return $this->hasOne(Unidade::class);
    }
}
