<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed'
        ];
    }

    public function messages()
    {
        return [
            'current_password.required' => 'Ingrese su contraseña actual',
            'new_password.required' => 'Ingrese su nueva contraseña',
            'new_password.min' => 'La nueva contraseña debe ser mayor a 6 caracteres',
            'new_password.confirmed' => 'Las contraseñas no coinciden'
        ];
    }
}
