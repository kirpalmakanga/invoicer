<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\DeleteMultipleCustomerRequest;
use App\Http\Resources\CustomerResource;

class CustomerController extends BaseController
{
    public function index()
    {
        $customers = Customer::where('userId', auth('api')->user()->id)
            ->get()
            ->sortByDesc('name');

        return $this->sendResponse(
            CustomerResource::collection($customers),
            'Customers retrieved successfully.'
        );
    }

    public function store(StoreCustomerRequest $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $customer = Customer::create($input);

        return $this->sendResponse(
            new CustomerResource($customer),
            'Customer created successfully.'
        );
    }

    public function show($id)
    {
        $customer = Customer::where('id', $id)
            ->where('userId', auth('api')->user()->id)
            ->first();

        if (is_null($customer)) {
            return $this->sendError('Customer not found.');
        }

        return $this->sendResponse(
            new CustomerResource($customer),
            'Customer retrieved successfully.'
        );
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        if ($customer->userId !== auth('api')->user()->id) {
            return $this->sendError('Forbidden.', 403);
        }

        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $customer->update($input);

        return $this->sendResponse(
            new CustomerResource($customer),
            'Customer updated successfully.'
        );
    }

    public function destroy(Customer $customer)
    {
        if ($customer->userId !== auth('api')->user()->id) {
            return $this->sendError('Forbidden.', 403);
        }

        $customer->delete();

        return $this->sendResponse([], 'Customer deleted successfully.');
    }

    public function destroyMultiple(DeleteMultipleCustomerRequest $request)
    {
        $ids = explode(',', $request->ids);

        Customer::whereIn('id', $ids)
            ->where('userId', auth('api')->user()->id)
            ->delete();

        return $this->sendResponse([], 'Customers deleted successfully.');
    }
}
