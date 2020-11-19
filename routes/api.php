<?php

// rotas jwt
Route::post('auth',         'Api\AuthController@authenticate');         // Autenticar usuário
Route::get('me',            'Api\AuthController@getAuthenticatedUser'); // Retorna usuário pelo token
Route::post('auth-refresh', 'Api\AuthController@refreshToken');         // Atualizar token
Route::post('register',     'Api\AuthController@register');             // Novo usuário


Route::group([
    'prefix'     => 'v1',
    'namespace'  => 'Api\v1',
    'middleware' => 'auth:api'
], function () {
    Route::get('/alunos',                 'AlunoController@index');
    Route::put('/storeAluno',             'AlunoController@store');
    Route::put('/updateAluno',            'AlunoController@update');
    Route::delete('/excluirAluno/{id}',   'AlunoController@destroy');

    Route::get('/turmas',                 'TurmaController@index');
    Route::put('/storeTurma',             'TurmaController@store');
    Route::put('/updateTurma',            'TurmaController@update');
    Route::delete('/excluirTurma/{id}',   'TurmaController@destroy');

    Route::get('/unidades',               'UnidadeController@index');
    Route::put('/storeUnidade',           'UnidadeController@store');
    Route::put('/updateUnidade',          'UnidadeController@update');
    Route::delete('/excluirUnidade/{id}', 'UnidadeController@destroy');
});