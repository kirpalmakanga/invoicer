<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Requests\DeleteMultipleInvoiceRequest;
use App\Http\Resources\InvoiceResource;

class InvoiceController extends BaseController
{
    public function index()
    {
        $invoices = Invoice::where('userId', auth('api')->user()->id)
            ->get()
            ->sortByDesc('created_at');

        return $this->sendResponse(
            InvoiceResource::collection($invoices),
            'Invoices retrieved successfully.'
        );
    }

    public function store(StoreInvoiceRequest $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $invoice = Invoice::create($input);

        return $this->sendResponse(
            new InvoiceResource($invoice),
            'Invoice created successfully.'
        );
    }

    public function show($id)
    {
        $invoice = Invoice::where('id', $id)
            ->where('userId', auth('api')->user()->id)
            ->first();

        if (is_null($invoice)) {
            return $this->sendError('Invoice not found.');
        }

        return $this->sendResponse(
            new InvoiceResource($invoice),
            'Invoice retrieved successfully.'
        );
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        if ($invoice->userId !== auth('api')->user()->id) {
            return $this->sendError('Forbidden.', 403);
        }

        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $invoice->update($input);

        return $this->sendResponse(
            new InvoiceResource($invoice),
            'Invoice updated successfully.'
        );
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->userId !== auth('api')->user()->id) {
            return $this->sendError('Forbidden.', 403);
        }

        $invoice->delete();

        return $this->sendResponse([], 'Invoice deleted successfully.');
    }

    public function destroyMultiple(DeleteMultipleInvoiceRequest $request)
    {
        /** TODO: fetchBy authId else 403 */
        $ids = explode(',', $request->ids);

        Invoice::whereIn('id', $ids)
            ->where('userId', auth('api')->user()->id)
            ->delete();

        return $this->sendResponse([], 'Invoices deleted successfully.');
    }
}
