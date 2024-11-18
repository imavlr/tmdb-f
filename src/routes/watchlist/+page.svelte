<script>
    let { genre } = $props();

    import Movie from '$lib/Movie.svelte';
    import { token } from '$lib/state.svelte.js';

    import { onMount } from "svelte";

    let movies = $state([]);
    let total = $state(0);;

    onMount(async () => {
        if (token) {
            const response = await fetch("http://localhost:8000/api/watchlists", {
            	method: 'GET',
            	'headers': {
            		'Authorization': `Bearer ${token.value}`,
            		'Content-Type': 'application/json',
            		'Accept': 'application/json',
            	},
            });

            const data = await response.json();
            movies = data;
        }
    });


    async function removeFromWatchlist(event, id) {
        event.preventDefault();
        const submitData = {};

        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlists/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();
            movies = data;
            console.log(data);

            if (!response.ok) {
                alert('Request failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request.');
        }
    }
</script>

<div class="prose max-w-7xl w-full">
    <div class="max-w-7xl w-full">
        <h1 class="dark:text-neutral-200 mt-8">Your watchlist</h1>
        <div class="dark:text-neutral-200 p-2">
            {#if movies.length == 0}
            <div>Your watchlist is empty</div>
            {/if}
            <div class="flex gap-2">
                {#each movies as movie}
                <div>

                    <div class="no-underline flex-shrink-0 w-36">
                        <div>
                            <div class="relative">
                                <a href="/movies/{movie.tmdb_id}" class="no-underline flex-shrink-0 w-36">
                                    <img class="m-0" src={movie.poster_url} alt="{movie.title} cover art">
                                </a>
                                <button onclick={(event) => removeFromWatchlist(event, movie.id)} class="absolute bottom-2 right-2 bg-gray-300 hover:bg-gray-500 rounded-full w-7 h-7 flex items-center justify-center text-black">X</button>
                            </div>

                            <a href="/movies/{movie.tmdb_id}" class="no-underline flex-shrink-0 w-36">
                                <div class="text-neutral-200">{movie.title}</div>
                            </a>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>
