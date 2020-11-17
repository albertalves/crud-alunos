<?php

Route::post('auth',         'Api\AuthController@authenticate');         // Autenticar usuário
Route::get('me',            'Api\AuthController@getAuthenticatedUser'); // Retorna usuário pelo token
Route::post('auth-refresh', 'Api\AuthController@refreshToken');         // Atualizar token
Route::post('register',     'Api\AuthController@register');             // Novo usuário ()

// Route::group([
//     'prefix'     => 'v1',
//     'namespace'  => 'Api\v1',
//     'middleware' => 'auth:api'
// ], function () {
//     Route::get('', '');
//     Route::post('', '');
// });