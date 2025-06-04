<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array

     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'customerId' => $this->customerId,
            'items' => $this->items,
            'paymentMethod' => $this->paymentMethod,
            'status' => $this->status,
            'datePaid' => $this->datePaid,
            'dateCreated' => $this->created_at,
        ];
    }
}
