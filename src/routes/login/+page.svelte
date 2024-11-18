<script>
    let login = true;
    let token = "";

    let name = '';
    let email = '';
    let password = '';
    let password_confirmation = '';

    async function handleForm(event) {
        event.preventDefault();

        let endpoint = 'http://127.0.0.1:8000/api/' + (login ? 'login' : 'register');
        const formData = {
            email,
            password,
        };

        // If not logging in (registering), include the name and password_confirmation fields
        if (!login) {
            formData.name = name;
            formData.password_confirmation = password_confirmation;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                // Force a reload of the front page
                window.location.href = '/';
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request.');
        }
    }
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white p-8 rounded-lg">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">{login ? 'Sign in to your account' : 'Register a new account'}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" on:submit={handleForm}>
      {#if !login}
      <div>
        <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
        <div class="mt-2">
          <input id="name" name="name" type="text" bind:value={name} autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
      </div>
      {/if}
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" bind:value={email} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" bind:value={password} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
          {#if !login}
        <div class="mt-2">
          <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-900">Confirm password</label>
          <input id="password_confirmation" name="password_confirmation" type="password" bind:value={password_confirmation} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
          {/if}
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{login ? 'Sign in' : 'Register'}</button>
      </div>
    </form>
    <button class="mt-4" on:click={login=!login}>{login ? 'Already have an account?' : "Don't have an account yet?"}</button>
  </div>
</div>
