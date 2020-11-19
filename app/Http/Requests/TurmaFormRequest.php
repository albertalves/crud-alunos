<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TurmaFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome'              => 'required',
            'vagas'             => 'required',
            'data_inicio'       => 'required',     
            'unidade_id'        => 'required',     
        ];
    }
    
    public function messages()
    {
        return [
            'nome.required'             => "O campo 'nome' é obrigatório",
            'vagas.required'            => "O campo 'vagas' é obrigatório",
            'data_inicio.required'      => "O campo 'data início' é obrigatório",
            'unidade_id.required'       => "O campo 'unidade' é obrigatório",
        ];
    }
}
