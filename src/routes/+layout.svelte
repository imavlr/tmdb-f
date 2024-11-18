<script>
	import '../app.css';
	let { children } = $props();
	import { loggedIn, token } from '$lib/state.svelte.js';
	token.value = localStorage.getItem('auth_token');
	if (token.value) {
        	loggedIn.value = true;
	}

	function logout(event) {
        	event.preventDefault()
        	if (token.value) {
        	    localStorage.removeItem('auth_token');
        	    token.value = null;
                    window.location.href = '/';
        	}
	}

</script>

<noscript class="bg-red-200">Please enable javascript for this site to function properly</noscript>
<header class="bg-neutral-800 flex justify-center">
    <div class="flex justify-between p-4 w-full max-w-7xl">
        <a href="/">
            <h1 class="dark:text-white text-4xl font-bold">TMDb</h1>
        </a>
        {#if loggedIn.value}
        <div class="relative group">
            <div class="flex items-center justify-center uppercase font-bold w-12 h-12 rounded-full bg-blue-500 text-white mb-0">vm</div>
            <div class="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg w-40 mt-0">
                <ul class="space-y-2 p-2">
                  <li><a href="/watchlist" class="text-gray-800 hover:bg-gray-200 p-2 block rounded">Watchlist</a></li>
                  <li><a href="#" onclick={logout} class="text-gray-800 hover:bg-gray-200 p-2 block rounded">Log out</a></li>
                </ul>
            </div>
        </div>
        {:else}
        	<a class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href="/login">Log In</a>
    	{/if}
</header>
<div class="w-full flex justify-center">
    {@render children()}
</div>
