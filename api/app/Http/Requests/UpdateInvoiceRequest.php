<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'reference' => 'required|string|unique:invoices,reference',
            'reference' => 'required|string',
            'customerId' => 'required|string|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|integer|min:0',
            'items.*.pricePerUnit' => 'required|integer|min:0',
            'items.*.unit' => [
                'required',
                'string',
                Rule::in(['hour', 'day', 'week']),
            ],
            'paymentMethod' => [
                'required',
                'string',
                Rule::in(['bankTransfer', 'creditCard', 'payPal']),
            ],
            'status' => [
                'required',
                'string',
                Rule::in(['pending', 'unpaid', 'paid']),
            ],
            'datePaid' => 'nullable|date',
        ];
    }
}
