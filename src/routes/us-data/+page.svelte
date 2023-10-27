<script>
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let /** @type { Boolean } **/ fetchingNames = false;
	let /** @type { String } **/ gender = 'MALE';

	/** @type {Array<{ label: string, value: number }>}**/
	const nameCountOptions = [
		{ label: 'Top 100', value: 100 },
		{ label: 'Top 1000', value: 1000 },
		{ label: 'All', value: 0 }
	];

	/** FIRST NAME SELECTION **/
	let /** @type { Number }**/ firstNameYear = 0;
	let /** @type { Number }**/ firstNameCount = 100;

	/** @type {Array<{ label: string, value: number }>}**/
	const firstNameYearOptions = [{ label: 'Random Year', value: 0 }];

	for (let i = 2021; i >= 1880; i--) {
		firstNameYearOptions.push({ label: i.toString(), value: i });
	}

	/** LAST NAME SELECTION **/
	let /** @type { Number } **/ lastNameYear = 0;
	let /** @type { Number } **/ lastNameCount = 100;

	const /** @type { Array<number> } **/ lastNameYears = [2010, 2000, 1990];

	/** @type {Array<{ label: string, value: number }>}**/
	const lastNameYearOptions = [{ label: 'Random Year', value: 0 }];

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
			fetchingNames = true;

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
		} finally {
			fetchingNames = false;
		}
	}
</script>

<h1 class="h1">Welcome to US Data page</h1>

<div class="flex flex-col gap-y-6 gap-x-6">
	<div class="flex gap-y-6 gap-x-6">
		<div class="flex flex-col gap-y-4 card p-4 w-1/3">
			<div>
				<h4 class="h4 pb-2"><span class="font-bold">Gender</span></h4>

				<select class="select w-auto" name="genders" id="gender-select" bind:value={gender}>
					<option value="MALE">Male</option>
					<option value="FEMALE">Female</option>
				</select>
			</div>

			<h4 class="h4"><span class="font-bold">Pick First Names from</span></h4>

			<div class="flex gap-x-4">
				<select
					class="select w-auto"
					name="first-name-count"
					id="first-name-count-select"
					bind:value={firstNameCount}
				>
					{#each nameCountOptions as countOption}
						<option value={countOption.value}>{countOption.label}</option>
					{/each}
				</select>

				<p class="self-center">Names from</p>

				<select
					class="select w-auto"
					name="first-name-years"
					id="first-name-year-select"
					bind:value={firstNameYear}
				>
					{#each firstNameYearOptions as yearOption}
						<option value={yearOption.value}>{yearOption.label}</option>
					{/each}
				</select>
			</div>

			<h4 class="h4"><span class="font-bold">Pick Last Names from</span></h4>

			<div class="flex gap-x-4">
				<select
					class="select w-auto"
					name="last-name-count"
					id="last-name-count-select"
					bind:value={lastNameCount}
				>
					{#each nameCountOptions as countOption}
						<option value={countOption.value}>{countOption.label}</option>
					{/each}
				</select>

				<p class="self-center">Names from</p>

				<select
					class="select w-auto"
					name="last-name-years"
					id="last-name-year-select"
					bind:value={lastNameYear}
				>
					{#each lastNameYearOptions as yearOption}
						<option value={yearOption.value}>{yearOption.label}</option>
					{/each}
				</select>
			</div>

			<button type="button" class="btn variant-filled" on:click={getNames}>Generate Names</button>
		</div>

		<div class="flex flex-col justify-around card p-4 w-1/3">
			{#if fetchingNames}
				<div class="self-center">
					<ProgressRadial />
				</div>
			{/if}

			{#if listOfNames !== undefined && !fetchingNames}
				<ul class="list">
					{#each listOfNames as name}
						<li>{name}</li>
					{/each}
				</ul>
				<p>
					<span class="font-bold">First Names</span> picked from {#if generatedFirstNameCount}<span
							class="font-bold">{generatedFirstNameCount}</span
						>
						out of
					{/if}<span class="font-bold">{firstNameTotalCount}</span> names from <span
						class="font-bold">{generatedFirstNameYear}</span
					>
				</p>
				<p>
					<span class="font-bold">Last Names</span> picked from {#if generatedLastNameCount}<span class="font-bold">{generatedLastNameCount}</span>
						out of
					{/if}<span class="font-bold">{lastNameTotalCount}</span> names from
					<span class="font-bold">{generatedLastNameYear}</span>
				</p>
			{/if}
		</div>
	</div>

	<div class="w-2/3">
		<details>
			<summary class="pb-4">About this Random Name Generator</summary>
			Names are generated from data collected by the U.S. Government. First names are provided using
			popular baby name data from the
			<a class="anchor" href="https://www.ssa.gov/data/">Social Security Administration</a>
			while last names are generated using surname frequency data collected by the
			<a class="anchor" href="https://www.census.gov/">US Census Bureau</a>.
		</details>
	</div>
</div>
