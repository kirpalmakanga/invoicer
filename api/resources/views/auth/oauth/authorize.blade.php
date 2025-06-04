<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        @vite('resources/css/app.css')
    </head>
    <body
        class="flex items-center justify-center h-dvh bg-slate-950 text-zinc-100"
    >
        <div class="container">
            <div class="flex justify-center">
                <div class="w-md rounded-md border border-zinc-100/10 p-8">
                    <h1 class="text-2xl text-center font-semibold mb-8">
                        Invoicer
                    </h1>

                    <h2 class="text-lg font-semibold mb-4">
                        Authorization Request
                    </h2>

                    <div class="mb-4 flex flex-col gap-4">
                        <!-- Introduction -->
                        <p>
                            <strong>{{ $client->name }}</strong>
                            is requesting permission to access your account.
                        </p>

                        <!-- Scope List -->
                        @if (count($scopes) > 0)
                            <div class="scopes">
                                <p>
                                    <strong>
                                        This application will be able to:
                                    </strong>
                                </p>

                                <ul>
                                    @foreach ($scopes as $scope)
                                        <li>{{ $scope->description }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>

                    <div class="flex justify-center gap-4">
                        <!-- Authorize Button -->
                        <form
                            method="post"
                            action="{{ route('passport.authorizations.approve') }}"
                        >
                            @csrf

                            <input
                                type="hidden"
                                name="state"
                                value="{{ $request->state }}"
                            />
                            <input
                                type="hidden"
                                name="client_id"
                                value="{{ $client->getKey() }}"
                            />
                            <input
                                type="hidden"
                                name="auth_token"
                                value="{{ $authToken }}"
                            />
                            <button
                                type="submit"
                                class="rounded bg-green-800 text-zinc-100 py-1 px-4"
                            >
                                Authorize
                            </button>
                        </form>

                        <!-- Cancel Button -->
                        <form
                            method="post"
                            action="{{ route('passport.authorizations.deny') }}"
                        >
                            @csrf
                            @method('DELETE')

                            <input
                                type="hidden"
                                name="state"
                                value="{{ $request->state }}"
                            />
                            <input
                                type="hidden"
                                name="client_id"
                                value="{{ $client->getKey() }}"
                            />
                            <input
                                type="hidden"
                                name="auth_token"
                                value="{{ $authToken }}"
                            />

                            <button
                                class="rounded bg-red-800 text-zinc-100 py-1 px-4"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
