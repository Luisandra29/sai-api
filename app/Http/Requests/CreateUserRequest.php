<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Ingrese su correo',
            'email.email' => 'Ingrese un correo electrónico válido',
            'email.unique' => 'Este correo ya ha sido utilizado',
            'password.required' => 'Ingrese una contraseña',
            'password.confirmed' => '¡La contraseña no coincide!'
        ];
    } 
}
