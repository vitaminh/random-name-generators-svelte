import { json } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';
import { getRandomIntFromZeroToVal, getRandomIntInclusive } from '$lib/utilities.js';

const nameCountLabels: any = {
	0: 'All',
	100: 'Top 100',
	1000: 'Top 1000'
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		// process incoming payload
		let { gender, firstNameYear, firstNameCount, lastNameYear, lastNameCount } = await request.json();

		let firstNamesPath: string = `${PUBLIC_SITE_BASE_URL}/data/names/firstnames`;
		let lastNamesPath: string = `${PUBLIC_SITE_BASE_URL}/data/names/lastnames`;

		// get name arrays based on payload parameters
		firstNamesPath += gender == 'MALE' ? '/maleFirstNamesByYear' : '/femaleFirstNamesByYear';

		if (!firstNameYear) {
			firstNameYear = getRandomIntInclusive(1880, 2021);
		}

		firstNamesPath += `/${firstNameYear}.json`;

		if (!lastNameYear) {
			const lastNameYears: Array<number> = [2010, 2000, 1990];
			lastNameYear = lastNameYears[getRandomIntFromZeroToVal(lastNameYears.length - 1)];
		}

		lastNamesPath += `/${lastNameYear}.json`;

		const firstNameResponse: Promise<Response> = fetch(`${firstNamesPath}`);
		const lastNameResponse: Promise<Response> = fetch(`${lastNamesPath}`);

		const nameResponse: Array<Response> = await Promise.all([firstNameResponse, lastNameResponse]);
		const nameData: Array<string[]> = await Promise.all([nameResponse[0].json(), nameResponse[1].json()]);

		// slice off subarray of top # of names requested
		if (firstNameCount == 0) {
			firstNameCount = nameData[0].length;
		}

		if (lastNameCount == 0) {
			lastNameCount = nameData[1].length;
		}

		const firstNames: Array<string> = nameData[0].slice(0, firstNameCount);
		const lastNames: Array<string> = nameData[1].slice(0, lastNameCount);

		// get random names from the subarrays and combine to create full names
		const maxFirstNameIndex = firstNames.length - 1;
		const maxLastNameIndex = lastNames.length - 1;
		const listOfNames: Array<string> = [];

		for (let i = 0; i < 10; i++) {
			const firstName: string = firstNames[getRandomIntFromZeroToVal(maxFirstNameIndex)];
			const lastName: string = lastNames[getRandomIntFromZeroToVal(maxLastNameIndex)];
			listOfNames.push(`${firstName} ${lastName}`);
		}

		return json({
			generatedFirstNameYear: firstNameYear,
			generatedLastNameYear: lastNameYear,
			firstNameTotalCount: nameData[0].length,
			generatedFirstNameCount: nameCountLabels[firstNameCount],
			lastNameTotalCount: nameData[1].length,
			generatedLastNameCount: nameCountLabels[lastNameCount],
			listOfNames
		});
	} catch (error: any) {
		console.error(error);
		return error;
	}
}

export const prerender = false;
