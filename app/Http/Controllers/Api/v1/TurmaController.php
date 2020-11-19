<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turma;
use App\Http\Requests\TurmaFormRequest;

class TurmaController extends Controller
{
    public function index(){
        $data = Turma::with('alunos')->get();

        return response()->json($data);
    }

    public function store(TurmaFormRequest $request) {
        $data = $request->all();
        Turma::create($data);

        if(isset($data['data_inicio'])){
            if($data['data_inicio'] < date('Y-m-d')) {
                $msg = 'A data de início não pode ser menor que a de hoje!';
                return response()->json(['dataInicio' => $msg], 401);
            }
        }
        
        return response()->json('Turma cadastrada com sucesso!', 201);
    }

    public function update(TurmaFormRequest $request){
        $data = $request->except('alunos');

        $turma = Turma::find($data['id']);
        $turma->update($data);

        return response()->json('Turma atualizada com sucesso!', 201);
    }

    public function destroy($id){
        $turma = Turma::find($id);

        if(count($turma->alunos) >= 1){
            $msg    = 'Não é possível excluir uma turma que possui alunos';
            $status = 401;
        }else {
            $msg    = 'Turma excluída com sucesso!';
            $status = 201;
            $turma->delete();
        }
        
        return response()->json($msg, $status);
    }
}
