<script>
	/** @type {Array<String>} **/
	let names;

	import { SITE_URL } from "../../utlities";

	async function getNames() {
		try {
			console.log(`SITE_URL: ${ SITE_URL }`);
			const response = await fetch('/api/us-data');
			console.log(response);
			names = await response.json();
			console.log(names);

		} catch (error) {
			console.log(error);
		}
	}
</script>

<h1>Welcome to US Data page</h1>

<button on:click={getNames}>Get Names</button>

{#if names !== undefined}
	{#each names as name}
	<p>{name}</p>
	{/each}
{/if}
