<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Unidade;
use App\Http\Requests\UnidadeFormRequest;

class UnidadeController extends Controller
{
    public function index(){
        $data = Unidade::with('turmas')->get();

        return response()->json($data);
    }

    public function store(UnidadeFormRequest $request) {
        $data = $request->all();
        Unidade::create($data);
        
        return response()->json('Unidade cadastrada com sucesso!', 201);
    }

    public function update(UnidadeFormRequest $request){
        $data = $request->all();

        $unidade = Unidade::find($data['id']);
        $unidade->update($data);

        return response()->json('Unidade atualizada com sucesso!', 201);
    }

    public function destroy($id){
        $unidade = Unidade::find($id);

        if(count($unidade->turmas) >= 1){
            $msg    = 'Não é possível excluir uma unidade que possui turmas';
            $status = 401;
        }else {
            $msg    = 'Unidade excluída com sucesso!';
            $status = 201;
            $unidade->delete();
        }
        
        return response()->json($msg, $status);
    }
}
