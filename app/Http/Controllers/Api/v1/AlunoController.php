<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AlunoFormRequest;
use App\Models\Aluno;
use App\Models\AlunoTurma;
use App\Models\Turma;

class AlunoController extends Controller
{
    public function index(Request $request){
        $data = Aluno::all();

        // Se for enviado algum filtro
        if ($request->select) {
            $data = Aluno::where('nome', 'LIKE', "%{$request->nameOrEmail}%")
            ->orWhere('email', 'LIKE', "%$request->nameOrEmail%")
            ->with('turmas')
            ->paginate(10);
        }  else {
            $data = Aluno::orderBy('id', 'DESC')->with('turmas')->paginate(10);
        }

        return response()->json($data);
    }

    public function store(AlunoFormRequest $request){
        $data = $request->all();
        $aluno = null;
        
        if (!empty($data['turmas'])) {
            foreach ($data['turmas'] as $turma) {
                
                $turma = $this->verificarVagasTurma($turma);
                if($turma['nome']) {
                    return response()->json('Não há vagas para '. $turma['nome'], 401);
                }

                // dessa forma o aluno será criado somente uma vez
                if(!$aluno) $aluno = Aluno::create($data);
            
                $alunoTurma = new AlunoTurma();
                $alunoTurma->turma_id = $turma;
                $alunoTurma->aluno_id = $aluno->id;
                $alunoTurma->save();
            }
        }else{
            $aluno = Aluno::create($data);
        }
        
        return response()->json('Cadastrado com sucesso!', 201);
    }

    public function update(AlunoFormRequest $request){
        $data = $request->all();

        $aluno = Aluno::find($data['id']);
        $aluno->update($data);

        $excluirTurmas   = array_diff($data['turmasOld'], $data['turmas']);
        $adicionarTurmas = array_diff($data['turmas'], $data['turmasOld']);

        if (count($excluirTurmas) > 0) {
            foreach ($excluirTurmas as $turmaId) {
                $excluirAlunoTurma = AlunoTurma::where('turma_id', $turmaId)
                    ->where('aluno_id', $data['id'])
                    ->first();
                $excluirAlunoTurma->delete();
            }
        }

        if (count($adicionarTurmas) > 0) {
            foreach ($adicionarTurmas as $turmaId) {
                $turma = $this->verificarVagasTurma($turmaId);

                if($turma['nome']) {
                    return response()->json('Não há vagas para '. $turma['nome'], 401);
                }

                $alunoTurma = new AlunoTurma();
                $alunoTurma->turma_id = $turmaId;
                $alunoTurma->aluno_id = $data['id'];
                $alunoTurma->save();
            }
        }

        return response()->json('Atualizado com sucesso!', 201);
    }

    public function destroy($id){
        $data = Aluno::find($id);
        
        $data->delete();

        return response()->json('Aluno excluido com sucesso!');
    }

    /**
     *  Retorna true, se houver vaga para a turma.
     */
    public function verificarVagasTurma($turma_id){
        $turma = Turma::where('id', $turma_id)->with('alunos')->first();
        $qtdAlunos = count($turma->alunos);
        $vagas = $turma->vagas;
        
        return ($vagas > $qtdAlunos) ? [true, 'há vagas'] : [false, 'nome' => $turma->nome];
    }
}
