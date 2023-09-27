import { json } from '@sveltejs/kit';
import { SITE_URL } from '../../../utlities';

export async function GET() {
	try {
		const response = await fetch(`${SITE_URL}/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
		return response;
	} catch (error) {
		console.error(error);
		console.log(SITE_URL);
	}
}

export const prerender = false;
