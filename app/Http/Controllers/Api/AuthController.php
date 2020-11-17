<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => ['authenticate', 'register', 'showUsers', 'destroy']
        ]);
    }
    
    /**
     * Login retornando usuario e token
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // recuperar usuário logado
        $user = auth()->user();

        // retorna o token e usuário
        return response()->json(compact('token', 'user'));
    }

    /**
     * Recuperar usuário pelo token
     */
    public function getAuthenticatedUser()
    {
        $response = $this->getUser();
        if($response['status'] != 200)
            return response()->json([$response['response']], $response['status']);

        if($response['status'] == 200)
            $user = $response['response'];

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    /**
     * Atualizar token
     */
    public function refreshToken()
    {
        // Se o token não for enviado
        if(!$token = JWTAuth::getToken())
            return response()->json(['error' => 'token_not_send'], 401);

        // Se for enviado, porém incorreto.
        try {
            $token = JWTAuth::refresh();
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        }

        return response()->json(compact('token'));
    }

    /**
     * Cadastrar novo usuário
     */
    public function register(Request $request, User $user)
    {
        $data = $request->only(['name', 'email', 'password']);
        $data['password'] = bcrypt($data['password']);

        $user->create($data);

        return $this->authenticate();
    }

    /**
     *  Função auxiliar
     */
    public function getUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return [
                    'response' => 'user_not_found',
                    'status'   => 404
                ];
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return [
                'response' => 'token_expired',
                'status' => $e->getStatusCode()
            ];
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return [
                'response' => 'token_invalid',
                'status' => $e->getStatusCode()
            ];
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return [
                'response' => 'token_absent',
                'status' => $e->getStatusCode()
            ];
        }

        return [
            'response' => $user,
            'status' => 200
        ];
    }
}
