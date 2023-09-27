<script>
	/** @type {Array<String>} **/
	let names;

	async function getNames() {
		const response = await fetch('/api/us-data');
		names = await response.json();
	}
</script>

<h1>Welcome to US Data page</h1>

<button on:click={getNames}>Get Names</button>

{#if names !== undefined}
	{#each names as name}
	<p>{name}</p>
	{/each}
{/if}
