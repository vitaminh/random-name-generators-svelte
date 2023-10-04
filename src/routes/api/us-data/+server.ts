import { json } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';
import { getRandomIntInclusive } from '$lib/utilities.js';

const FIRST_NAMES_BASEPATH: string = `${ PUBLIC_SITE_BASE_URL }/data/names/firstnames`;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		// process incoming payload
		let { gender, firstNameYear } = await request.json();

		let firstNamesPath: string;

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

		const response: Response = await fetch(`${ firstNamesPath }`);
		const subArray: string[] = await response.json();

		// return arrays of names
		return json(subArray.slice(0, 10));
	} catch (error: any) {
		console.error(error);
		return error;
	}
}

export const prerender = false;
