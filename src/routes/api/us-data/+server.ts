import { json } from '@sveltejs/kit';

export async function GET() {

	const response = await fetch(`http://localhost:5173/data/names/firstnames/femaleFirstNamesByYear/1880.json`);
	return response;
}

export const prerender = true;
