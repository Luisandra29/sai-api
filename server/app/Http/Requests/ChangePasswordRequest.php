<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'password' => 'required|min:6|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'password.required' => 'Ingrese la nueva contraseña', 
            'password.min' => 'La nueva contraseña debe tener un mínimo de 6 caracteres', 
            'password.confirmed' => 'Las contraseñas no son iguales', 
        ];
    }
}
