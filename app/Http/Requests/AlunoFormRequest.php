<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlunoFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome'       => 'required',
            'email'      => 'required',
            'cep'        => 'required',     
        ];
    }
    
    public function messages()
    {
        return [
            'nome.required'     => "O campo 'nome' é obrigatório",
            'email.required'    => "O campo 'E-mail' é obrigatório",
            'cep.required'      => "O campo 'cep' é obrigatório",
        ];
    }
}
