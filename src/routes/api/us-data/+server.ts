import { json } from '@sveltejs/kit';
import { SITE_URL } from '../../../utlities';

export async function GET() {

	const response = await fetch(`${SITE_URL}/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
	return response;
}

export const prerender = true;
