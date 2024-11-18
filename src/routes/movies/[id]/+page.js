import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const response = await fetch("http://localhost:8000/api/movies/" + params.id);

  const details = await response.json();
  return details;
}
