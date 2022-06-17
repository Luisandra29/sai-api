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
            'title' => 'required|max:200',
            'description' => 'required|max:500',
            'quantity' => 'nullable|integer|numeric',
            'subcategory_id' => 'required',
            'person_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Ingrese un título',
            'title.max' => '200 caracteres permitidos',
            'description.max' => '500 caracteres permitidos',
            'description.required' => 'Ingrese una descripción',
            'subcategory_id.required' => 'Seleccione una categoría',
            'person_id.required' => 'Seleccione una persona'
        ];
    }
}
