<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMoneyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "amount"=> "required|numeric",
        ];
    }

    public function messages(): array
    {
        return [
            "amount.required" => "Le montant est requis",
            "amount.numeric" => "Le montant doit être numérique",
        ];
    }
}
