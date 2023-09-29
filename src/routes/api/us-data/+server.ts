import { json } from '@sveltejs/kit';
// import { SITE_URL } from '../../../utlities';
import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		// const response = await fetch(`${PUBLIC_SITE_BASE_URL}/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
		const response: Response = await fetch(`${PUBLIC_SITE_BASE_URL}/data/testArray.json`);
		const subArray: string[] = await response.json();
		console.log('subArray:');
		console.log(subArray);
		// return response;
		return json(subArray);
	} catch (error: any) {
		console.error(error);
		console.log(PUBLIC_SITE_BASE_URL);
		return error;
	}
}

export const prerender = false;
