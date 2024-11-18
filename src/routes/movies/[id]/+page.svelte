<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
    console.log(data);
</script>


<div class="dark:text-white w-full prose max-w-none">
    <!-- Movie details -->
    <div class="bg-cover flex justify-center" style={"background-image: url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,33132f,4f46e5)" + data.backdrop_path + "');"}>
        <div class="sm:flex gap-4 max-w-7xl p-2 pt-6">
            <img class="mt-0 p-2 pl-4" src={"https://image.tmdb.org/t/p/w154" + data.poster_path}>
            <div class="p-4">
                <h2 class="dark:text-white mt-0">{data.title}</h2>
                <div class="font-bold">{data.release_date.slice(0, 4)}</div>
                <ul class="flex space-x-4 list-none p-0 m-0">
                {#each data.genres as genre}
            	<li>{genre.name}</li>
                {/each}
                </ul>
                <p>{data.overview}</p>
            </div>
        </div>
    </div>
    <!-- Additional details -->
    <div class="flex justify-center">
        <div class="max-w-7xl p-6 w-full">
            <h2 class="dark:text-neutral-200">Actors and Directors</h2>
            <div>
                <div class="dark:text-neutral-200 font-bold">
                    Directors
                </div>
            	<div class="overflow-x-auto mb-8">
                    <div class="flex gap-2">
                        {#each data.credits.crew as crew}
                        {#if crew.job == "Director"}
                    	<div class="flex-shrink-0 w-36">
                		<img class="mb-1 mt-4" src={"https://media.themoviedb.org/t/p/w138_and_h175_face" + crew.profile_path}>
                		<div class="font-bold">{crew.name}</div>
                    	</div>
                        {/if}
                        {/each}
                    </div>
            	</div>

                <div class="dark:text-neutral-200 font-bold">
                    Actors
                </div>
            	<div class="overflow-x-auto">
                    <div class="flex gap-2">
                        {#each data.credits.cast as cast}
                    	<div class="flex-shrink-0 w-36">
                        	{#if cast.profile_path}
                		<img class="mb-1 mt-4" src={"https://media.themoviedb.org/t/p/w138_and_h175_face" + cast.profile_path}>
                		{/if}
                		<div class="dark:text-neutral-200 font-bold">{cast.name}</div>
                		<div>{cast.character}</div>
                    	</div>
                        {/each}
                    </div>
            	</div>
            </div>
            <div>Optional: Trailer</div>
        </div>
    </div>
</div>

