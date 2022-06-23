<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePersonRequest extends FormRequest
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
            'dni' => 'required',
            'name' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'community_id' => 'required',
            'parish_id' => 'required',
            'sector_id' => 'required',
            'street_id' => 'required',
            'positions' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'dni.required' => 'Ingrese número de cédula',
            'name.required' => 'Ingrese nombre',
            'address.required' => 'Ingrese dirección',
            'phone.required' => 'Ingrese número de contacto',
            'community_id.required' => 'Seleccione una comunidad',
            'parish_id.required' => 'Seleccione una parroquia',
            'sector_id.required' => 'Seleccione un sector',
            'street_id.required' => 'Seleccione una calle',
            'positions.required' => 'Seleccione un cargo'
        ];
    }
}
