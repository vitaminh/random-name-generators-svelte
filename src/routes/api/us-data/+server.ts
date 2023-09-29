import { json } from '@sveltejs/kit';
import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

// TODO: Add cors check
/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const response: Response = await fetch(`${PUBLIC_SITE_BASE_URL}/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
		const subArray: string[] = await response.json();
		return json(subArray.slice(0, 9));
	} catch (error: any) {
		console.error(error);
		return error;
	}
}

export const prerender = false;
