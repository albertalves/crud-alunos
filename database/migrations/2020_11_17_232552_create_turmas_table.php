<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTurmasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turmas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('unidade_id')->unsigned();

            $table->foreign('unidade_id')
                    ->references('id')
                    ->on('unidades')
                    ->onDelete('cascade'); // Ao deletar a unidade, deletar as turmas.

            $table->string('nome')->unique();
            $table->bigInteger('vagas');
            $table->date('data_inicio');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turmas');
    }
}
