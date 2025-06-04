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

                    <h2 class="text-lg font-semibold mb-4">Login</h2>

                    <form
                        class="flex flex-col gap-4"
                        method="POST"
                        action="{{ route('login') }}"
                    >
                        @csrf

                        <div>
                            <label
                                for="email"
                                class="flex items-center gap-2 text-sm leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-bold mb-1"
                            >
                                Email
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="email"
                                    type="email"
                                    class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive {{ $errors->has('email') ? 'is-invalid' : '' }}"
                                    name="email"
                                    value="{{ old('email') }}"
                                    required
                                    autofocus
                                />

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback">
                                        <strong>
                                            {{ $errors->first('email') }}
                                        </strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div>
                            <label
                                for="password"
                                class="flex items-center gap-2 text-sm leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-bold mb-1"
                            >
                                {{ __('Password') }}
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="password"
                                    type="password"
                                    class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive {{ $errors->has('password') ? 'is-invalid' : '' }}"
                                    name="password"
                                    required
                                />

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback">
                                        <strong>
                                            {{ $errors->first('password') }}
                                        </strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <button
                                type="submit"
                                class="rounded bg-zinc-100 disabled:bg-zinc-100/10 text-slate-950 py-1 px-4"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script>
            // (function () {
            //     const submit = document.querySelector('[type="submit"]');
            //     const form = document.querySelector('form');

            //     submit.addEventListener('click', async (e) => {
            //         e.preventDefault();
            //         submit.setAttribute('disabled', true);

            //         const formData = new FormData(form);

            //         const response = await fetch('/login', {
            //             method: 'POST',
            //             body: formData
            //         });

            //         console.log(response)

            //         // window.location.href = "/";

            //         submit.setAttribute('disabled', false);
            //     });
            // })();
        </script>
    </body>
</html>
