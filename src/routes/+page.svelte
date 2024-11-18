<script>
    import { onMount } from "svelte";
    import Movie from '$lib/Movie.svelte';
    import Genre from '$lib/Genre.svelte';
    let targetGenres = ["Action", "Comedy", "Thriller", "War", "Romance", "Drama", "Crime", "Documentary", "Horor" ];
    let genres = ' { "genres": [ { "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" } ] }';
    let g = JSON.parse(genres);
</script>

<div class="prose max-w-7xl w-full">
    <div class="max-w-7xl w-full">
        <h1 class="dark:text-neutral-200 mt-8">Movies</h1>
        <div class="dark:text-neutral-200">
            {#each g.genres as genre}
            	{#if targetGenres.includes(genre.name)}
                    	<Genre genre={genre} />
                    {/if}
            {/each}
        </div>
    </div>
</div>
