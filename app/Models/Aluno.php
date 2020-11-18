<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'cep',
        'logradouro',
        'bairro',
        'estado',
        'cidade'
    ];

    public function turmas(){
        return $this->belongsToMany(Turma::class, 'aluno_turma', 'aluno_id', 'turma_id');
    }
}
