<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordResetRequest extends FormRequest
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
            'email' => 'required|string|email'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Ingrese un email válido',
            'email.string' => 'Ingrese un email válido',
            'email.email' => 'Ingrese un email válido',
        ];
    }
}
