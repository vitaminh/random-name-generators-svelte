<script>
	/** @type { String } **/
	let gender = 'MALE';

	/** @type { Number }**/
	let firstNameYear = 0;

	/** @type {Array<{ label: string, value: number }>}**/
	const firstNameYearOptions = [{ label: 'Random', value: 0 }];

	for (let i = 2021; i >= 1880; i--) {
		firstNameYearOptions.push({ label: i.toString(), value: i});
	}

	/** @type Number **/
	let lastNameYear = 0;

	/** @type { Array<number> } **/
	export const lastNameYears = [2010, 2000, 1990];

	/** @type {Array<{ label: string, value: number }>}**/
  const lastNameYearOptions = [{ label: 'Random', value: 0 },];

  for (const lastNameYear of lastNameYears) {
    lastNameYearOptions.push({ label: `${lastNameYear}`, value: lastNameYear });
  }

	/** @type {Array<String>} **/
	let names;

	async function getNames() {
		try {
			const response = await fetch('/api/us-data', {
				method: 'POST',
				body: JSON.stringify({
					gender,
					firstNameYear,
					lastNameYear
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
		{#each firstNameYearOptions as yearOption }
			<option value={yearOption.value}>{yearOption.label}</option>
		{/each}
	</select>
</div>

<div>
	<label for="last-name-year-select">Last Names - Choose a Year:</label>

	<select name="last-name-years" id="last-name-year-select" bind:value={ lastNameYear }>
		{#each lastNameYearOptions as yearOption }
			<option value={yearOption.value}>{yearOption.label}</option>
		{/each}
	</select>
</div>

<button on:click={getNames}>Get Names</button>

{#if names !== undefined}
	{#each names as name}
	<p>{name}</p>
	{/each}
{/if}
