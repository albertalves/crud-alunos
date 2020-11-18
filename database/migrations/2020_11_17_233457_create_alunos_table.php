<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlunosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->increments('id');
            $table->text('nome');
            $table->string('email');
            $table->string('telefone', 45)->nullable();
            $table->string('cep', 20);
            $table->text('logradouro')->nullable();
		    $table->text('bairro')->nullable();
		    $table->text('estado')->nullable();
            $table->text('cidade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alunos');
    }
}
