<script>
    let { genre } = $props();

    import Movie from '$lib/Movie.svelte';

    import { onMount } from "svelte";

    let movies = $state({});
    let total = $state(0);;

    onMount(async () => {
        const response = await fetch("http://localhost:8000/api/genre/" + genre.name);

        const data = await response.json();
        total = data.total_results;
        movies = data.results;
        console.log(movies);
    });
</script>

<div class="flex gap-2 no-underline">
    <a class="flex gap-2" href={"/genre/" + genre.name}>
        <h4 class="dark:text-neutral-200 m-0">{genre.name}</h4>
        <div class="dark:text-neutral-200">({total})</div>
    </a>
</div>
<div class="overflow-x-auto">
    <div class="flex gap-2">
        {#each movies as movie}
                <Movie posterUrl={"https://image.tmdb.org/t/p/w154" + movie.poster_path} title={movie.title} movieId={movie.id}/>
        {/each}
        <Movie posterUrl="" title="Load More" />
    </div>
</div>
