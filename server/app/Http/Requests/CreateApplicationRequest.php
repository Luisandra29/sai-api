<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateApplicationRequest extends FormRequest
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
            'title' => 'required|max:100',
            'description' => 'required|max:500',
            'category' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Ingrese un título',
            'title.max' => '100 caracteres permitidos',
            'description.max' => '500 caracteres permitidos',
            'description.required' => 'Ingrese una descripción',
            'category.required' => 'Seleccione una categoría'
        ];
    }
}
