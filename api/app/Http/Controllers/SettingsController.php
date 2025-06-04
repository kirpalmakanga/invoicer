<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Settings;
use App\Http\Requests\UpdateSettingsRequest;
use App\Http\Resources\SettingsResource;

class SettingsController extends BaseController
{
    public function get()
    {
        $settings = Settings::where('userId', Auth::id())->first();

        return $this->sendResponse(
            is_null($settings) ? null : new SettingsResource($settings),
            'Settings retrieved successfully.'
        );
    }

    public function set(UpdateSettingsRequest $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $settings = Settings::where('userId', auth('api')->user()->id)->first();

        if ($settings) {
            $settings->update($input);
        } else {
            $settings = Settings::create($input);
        }

        return $this->sendResponse([], 'Settings updated successfully.');
    }
}
