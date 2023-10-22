import { json } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';
import { getRandomIntBetweenZeroAndVal, getRandomIntInclusive } from '$lib/utilities.js';

const FIRST_NAMES_BASEPATH: string = `${ PUBLIC_SITE_BASE_URL }/data/names/firstnames`;
const LAST_NAMES_BASEPATH: string = `${ PUBLIC_SITE_BASE_URL }/data/names/lastnames`;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		// process incoming payload
		let { gender, firstNameYear, lastNameYear } = await request.json();

		let firstNamesPath: string;
		let lastNamesPath: string = LAST_NAMES_BASEPATH;

		// get name arrays based on payload parameters
		if (gender == 'MALE') {
			firstNamesPath = FIRST_NAMES_BASEPATH + '/maleFirstNamesByYear';
		} else {
			firstNamesPath = FIRST_NAMES_BASEPATH + '/femaleFirstNamesByYear';
		}

		if (!firstNameYear) {
			firstNameYear = getRandomIntInclusive(1880, 2021);
		}

		firstNamesPath+=`/${ firstNameYear }.json`;

		if (!lastNameYear) {
			const lastNameYears: number[] = [2010, 2000, 1990];
			lastNameYear = lastNameYears[getRandomIntBetweenZeroAndVal(lastNameYears.length - 1)];
		}

		lastNamesPath +=`/${ lastNameYear }.json`;

		const firstNameResponse: Promise<Response> = fetch(`${ firstNamesPath }`);
		const lastNameResponse: Promise<Response> = fetch(`${ lastNamesPath }`);

		const nameResponse: Response[] = await Promise.all([firstNameResponse, lastNameResponse]);
		const nameData: Array<string[]> = await Promise.all([nameResponse[0].json(), nameResponse[1].json()]);

		// slice off subarray of top percentage of names requested
		const firstNameCount: number = 100;
		const lastNameCount: number = 100;
		const firstNames: Array<string> = nameData[0].slice(100);
		const lastNames: Array<string> = nameData[1].slice(100);

		// get random names from the subarrays and combine to create full names
		const listOfNames: string[] = [];

		for (let i = 0; i < 10; i++) {
			const firstName: string = firstNames[getRandomIntBetweenZeroAndVal(firstNameCount - 1)];
			const lastName: string = lastNames[getRandomIntBetweenZeroAndVal(lastNameCount - 1)];
			listOfNames.push(`${ firstName } ${ lastName }`);
		}

		// return arrays of names
		// TODO: create response object that inclues list of names and generation stats (total # of names, etc.)
		return json(listOfNames);
	} catch (error: any) {
		console.error(error);
		return error;
	}
}

export const prerender = false;
