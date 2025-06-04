<?php
namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Laravel\Passport\Token;

class AuthController extends BaseController
{
    public function register(RegisterRequest $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, $request->rules());

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input['password'] = bcrypt($input['password']);

        try {
            User::create($input);

            return $this->sendResponse([], 'User registered successfully.');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 401);
        }
    }

    public function redirect(Request $request)
    {
        $request->session()->put('state', $state = Str::random(40));

        $query = http_build_query([
            'client_id' => env('OAUTH_CLIENT_ID'),
            'redirect_uri' => env('OAUTH_CLIENT_CALLBACK'),
            'scope' => env('OAUTH_CLIENT_SCOPE'),
            'response_type' => 'code',
            'prompt' => 'login',
            'state' => $state,
        ]);

        return $this->sendResponse(
            url('/oauth/authorize?' . $query),
            'Redirect url retrieved successfully.'
        );
    }

    public function login(Request $request)
    {
        if ($request->isMethod('POST')) {
            try {
                if (
                    auth()
                        ->guard()
                        ->attempt($request->only('email', 'password'))
                ) {
                    $user = User::where('email', $request->email)->first();
                    $token = $user->createToken('Laravel Password Grant Client')
                        ->accessToken;

                    Session::put('access_token', $token);

                    return redirect()->intended();
                } else {
                    throw new \Exception(
                        'Invalid credentials. Please check your email and password.'
                    );
                }
            } catch (\Exception $e) {
                return $this->sendError($e->getMessage(), [], 401);
            }
        } else {
            return view('login');
        }
    }

    public function token(Request $request)
    {
        $code = $request->code;
        $state = $request->state;

        $sessionState = $request->session()->pull('state');

        if (!$code) {
            return $this->sendError('Authorization code required.', [], 400);
        }

        if ($state && $state === $sessionState) {
            return $this->sendError('Invalid state value.', [], 400);
        }

        try {
            $response = Http::asForm()->post(url('/oauth/token'), [
                'grant_type' => 'authorization_code',
                'client_id' => env('OAUTH_CLIENT_ID'),
                'client_secret' => env('OAUTH_CLIENT_SECRET'),
                'redirect_uri' => env('OAUTH_CLIENT_CALLBACK'),
                'code' => $code,
            ]);

            $json = $response->json();

            if (array_key_exists('error', $json)) {
                throw new \Exception($json['hint']);
            }

            return $this->sendResponse(
                [
                    'accessToken' => $json['access_token'],
                    'refreshToken' => $json['refresh_token'],
                ],
                'Tokens retrieved successfully.'
            );
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 400);
        }
    }

    public function refresh(Request $request)
    {
        $refreshToken = $request->refreshToken;

        try {
            $response = Http::asForm()->post(url('/oauth/token'), [
                'grant_type' => 'refresh_token',
                'refresh_token' => $refreshToken,
                'client_id' => env('OAUTH_CLIENT_ID'),
                'client_secret' => env('OAUTH_CLIENT_SECRET'),
            ]);

            $json = $response->json();

            if (array_key_exists('error', $json)) {
                throw new \Exception($json['hint']);
            }

            return $this->sendResponse(
                [
                    'accessToken' => $json['access_token'],
                    'refreshToken' => $json['refresh_token'],
                ],
                'Tokens refreshed successfully.'
            );
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 400);
        }
    }

    public function logout()
    {
        $userId = auth('api')->user()->id;

        Token::where('user_id', $userId)->update([
            'revoked' => true,
        ]);
    }

    public function me()
    {
        $userId = auth('api')->user()->id;

        $user = User::where('user_id', $userId);

        return $this->sendResponse(
            new UserResource($user),
            'User information retrieved successfully.'
        );
    }
}
