<script>
    import { loggedIn, token } from '$lib/state.svelte.js';
    let { posterUrl, title, movieId } = $props();

    async function addToWatchlist(event, movieId, title, posterUrl) {
        console.log("Adding movie: " + movieId);
        event.preventDefault();
        const submitData = {};
        submitData.tmdb_id = movieId.toString();
        submitData.title = title;
        submitData.poster_url = posterUrl;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlists', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            const data = await response.json();
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

<div class="no-underline flex-shrink-0 w-36">
    <div>
        <div class="relative">
            <a href="/movies/{movieId}" class="no-underline flex-shrink-0 w-36">
                <img class="m-0" src={posterUrl} alt="{title} cover art">
            </a>
            {#if loggedIn.value}
            <button onclick={(event) => addToWatchlist(event, movieId, title, posterUrl)} class="absolute bottom-2 right-2 bg-gray-300 hover:bg-gray-500 rounded-full w-7 h-7 flex items-center justify-center text-black">+</button>
            {/if}
        </div>

        <a href="/movies/{movieId}" class="no-underline flex-shrink-0 w-36">
            <div class="text-neutral-200">{title}</div>
        </a>
    </div>
</div>
