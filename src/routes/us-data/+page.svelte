<script>
	/** @type { String } **/
	let gender = 'MALE';

	/** @type { Number }**/
	let firstNameYear = 0;

	/** @type {Array<{ label: string, value: number }>}**/
	let firstNameYears = [{ label: 'Random', value: 0 }];

	for (let i = 2021; i >= 1880; i--) {
		firstNameYears.push({ label: i.toString(), value: i});
	}

	/** @type {Array<String>} **/
	let names;

	async function getNames() {
		try {
			const response = await fetch('/api/us-data', {
				method: 'POST',
				body: JSON.stringify({
					gender,
					firstNameYear
				})
			});
			names = await response.json();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h1>Welcome to US Data page</h1>

<div>
	<label for="gender-select">Choose a Gender:</label>

	<select name="genders" id="gender-select" bind:value={ gender }>
		<option value="MALE">Male</option>
		<option value="FEMALE">Female</option>
	</select>
</div>

<div>
	<label for="first-name-year-select">First Names - Choose a Year:</label>

	<select name="first-name-years" id="first-name-year-select" bind:value={ firstNameYear }>
		{#each firstNameYears as year }
			<option value={year.value}>{year.label}</option>
		{/each}
	</select>
</div>

<button on:click={getNames}>Get Names</button>

{#if names !== undefined}
	{#each names as name}
	<p>{name}</p>
	{/each}
{/if}
