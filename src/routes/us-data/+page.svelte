<script>
	let /** @type { String } **/ gender = 'MALE';

	/** @type {Array<{ label: string, value: number }>}**/
	const nameCountOptions = [
		{ label: 'Top 100 ', value: 100 },
		{ label: 'Top 1000', value: 1000 },
		{ label: 'All', value: 0 }
	];

	/** FIRST NAME SELECTION **/
	let /** @type { Number }**/ firstNameYear = 0;
	let /** @type { Number }**/ firstNameCount = 100;

	/** @type {Array<{ label: string, value: number }>}**/
	const firstNameYearOptions = [{ label: 'Random', value: 0 }];

	for (let i = 2021; i >= 1880; i--) {
		firstNameYearOptions.push({ label: i.toString(), value: i });
	}

	/** LAST NAME SELECTION **/
	let /** @type Number **/ lastNameYear = 0;
	let /** @type { Number }**/ lastNameCount = 100;

	const /** @type { Array<number> } **/ lastNameYears = [2010, 2000, 1990];

	/** @type {Array<{ label: string, value: number }>}**/
	const lastNameYearOptions = [{ label: 'Random', value: 0 }];

	for (const lastNameYear of lastNameYears) {
		lastNameYearOptions.push({ label: `${lastNameYear}`, value: lastNameYear });
	}

	let /** @type {Array<String>} **/ listOfNames;
	let /** @type { String } **/ generatedFirstNameYear;
	let /** @type { String } **/ generatedLastNameYear;
	let /** @type { String } **/ firstNameTotalCount;
	let /** @type { String } **/ generatedFirstNameCount;
	let /** @type { String } **/ lastNameTotalCount;
	let /** @type { String } **/ generatedLastNameCount;

	async function getNames() {
		try {
			const response = await fetch('/api/us-data', {
				method: 'POST',
				body: JSON.stringify({
					gender,
					firstNameYear,
					firstNameCount,
					lastNameYear,
					lastNameCount
				})
			});
			({
				listOfNames,
				generatedFirstNameYear,
				generatedLastNameYear,
				firstNameTotalCount,
				generatedFirstNameCount,
				lastNameTotalCount,
				generatedLastNameCount
			} = await response.json());
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h1>Welcome to US Data page</h1>

<div>
	<label for="gender-select">Choose a Gender:</label>

	<select name="genders" id="gender-select" bind:value={gender}>
		<option value="MALE">Male</option>
		<option value="FEMALE">Female</option>
	</select>
</div>

<div>
	<label for="first-name-year-select">First Names - Choose a Year:</label>

	<select name="first-name-years" id="first-name-year-select" bind:value={firstNameYear}>
		{#each firstNameYearOptions as yearOption}
			<option value={yearOption.value}>{yearOption.label}</option>
		{/each}
	</select>
</div>

<div>
	<label for="first-name-count-select">First Names - Choose Count:</label>

	<select name="first-name-count" id="first-name-count-select" bind:value={firstNameCount}>
		{#each nameCountOptions as countOption}
			<option value={countOption.value}>{countOption.label}</option>
		{/each}
	</select>
</div>

<div>
	<label for="last-name-year-select">Last Names - Choose a Year:</label>

	<select name="last-name-years" id="last-name-year-select" bind:value={lastNameYear}>
		{#each lastNameYearOptions as yearOption}
			<option value={yearOption.value}>{yearOption.label}</option>
		{/each}
	</select>
</div>

<div>
	<label for="last-name-count-select">Last Names - Choose Count:</label>

	<select name="last-name-count" id="last-name-count-select" bind:value={lastNameCount}>
		{#each nameCountOptions as countOption}
			<option value={countOption.value}>{countOption.label}</option>
		{/each}
	</select>
</div>

<button on:click={getNames}>Get Names</button>

{#if listOfNames !== undefined}
	{#each listOfNames as name}
		<p>{name}</p>
	{/each}
	<p>First Name Year: { generatedFirstNameYear }</p>
	<p>First Names: Top { generatedFirstNameCount } out of { firstNameTotalCount }</p>
	<p>Last Name Year: { generatedLastNameYear }</p>
	<p>Last Names: Top { generatedLastNameCount } out of { lastNameTotalCount }</p>
{/if}
