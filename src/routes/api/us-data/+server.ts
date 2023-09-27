import { json } from '@sveltejs/kit';
// import { SITE_URL } from '../../../utlities';
import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

export async function GET() {
	try {
		const response = await fetch(`${PUBLIC_SITE_BASE_URL}/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
		return response;
	} catch (error) {
		console.error(error);
		console.log(PUBLIC_SITE_BASE_URL);
		return error;
	}
}

export const prerender = false;
