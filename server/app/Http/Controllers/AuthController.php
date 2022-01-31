<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Notifications\PasswordResetNotification;
use App\Models\User;
use App\PasswordReset;
use Auth;
use Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = request(['email', 'password']);
        $credentials['active'] = true;
        $credentials['deleted_at'] = null;

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'email' => 'Tu contraseña o correo son inválidos.'
                ]
            ], 401);
        }
        $user = Auth::user();

        //$tokenResult = $user->createToken('authToken');

        return response()->json([
            //'token' => $tokenResult->accessToken,
            'token' => auth()->user()->createToken('authToken')->plainTextToken,
            //'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([ 'success' => true ]);
    }

    public function getUser(Request $request)
    {
        return response()->json([
            'user' => $request
                ->user()
                ->load('profile.applications', 'profile.organizations')
        ]);
    }
}
