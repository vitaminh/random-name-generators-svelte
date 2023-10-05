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

		// return arrays of names
		const result: string[] = [];

		for (let i = 0; i < 10; i++) {
			result.push(`${nameData[0][i]} ${ nameData[1][i] }`);
		}

		return json(result);
	} catch (error: any) {
		console.error(error);
		return error;
	}
}

export const prerender = false;
