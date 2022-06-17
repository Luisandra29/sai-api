<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\Http\Requests\UpdatePasswordRequest;

class UpdatePasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdatePasswordRequest $request)
    {
        $newPassword = $request->input('new_password');
        $currentPass = $request->input('current_password');
        $user = $request->user();

        if (!Hash::check($currentPass, $user->password)) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'current_password' => 'La contraseña actual es incorrecta'
                ]
            ], 400);
        }

        if ($currentPass == $newPassword) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'new_password' => 'La nueva contraseña no debe ser igual a la anterior'
                ]
            ], 400);
        }

        $user->password = Hash::make($newPassword);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => '¡Contraseña actualizada!'
        ]);
    }
}
