<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Models\User;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!User::whereEmail($request->email)->first()) {
            return response()->json([
                'errors' => [
                    'email' => 'El correo no existe'
                ]
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'errors' => [
                    'password' => 'Contraseña incorrecta'
                ]
            ], 422);
        }

        return response()->json([
            'token' => $request->user()->createToken('12345')->plainTextToken,
            'user' => $request->user(),
            'message' => 'Success'
        ]);
    }
}
