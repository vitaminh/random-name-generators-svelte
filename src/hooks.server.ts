import type { Handle } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

export const handle: Handle = async ({ resolve, event }) => {
	// const validDomains: RegExp = /^(.*)?\.?example\.com$/;
	// const validDomains: RegExp = new RegExp(PUBLIC_SITE_BASE_URL);
	// let cors: string | null = null;
	// let originDomain = null;

	// if (event.request.headers.get('origin')) {
	// 	try {
	// 		console.log('validating original domain');
	// 		console.log(event.request.headers.get('origin'));
	// 		originDomain = new URL(event.request.headers.get('origin') || '').hostname;
	// 		// const originHeader = event.request.headers.get('origin');

	// 		// originDomain = new URL(event.request.headers.get('origin') ?? '').hostname;
	// 		console.log('originDomain: ' + originDomain);
	// 		if (validDomains.test(originDomain)) {
	// 			cors = originDomain;
	// 		}
	// 	} catch (e) {
	// 		console.log('Invalid origin', e);
	// 	}
	// }


	// // Apply CORS header for API routes
	// if (event.url.pathname.startsWith('/api')) {
	// 	// Required for CORS to work
	// 	// if(event.request.method === 'OPTIONS') {
	// 	if (event.request.method === 'OPTIONS' && cors) {
	// 		return new Response(null, {
	// 			headers: {
	// 				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	// 				'Access-Control-Allow-Origin': '*',
	// 				'Access-Control-Allow-Headers': '*',
	// 			}
	// 		});
	// 	}
	// }

	const response = await resolve(event);

	response.headers.append('Access-Control-Allow-Origin', PUBLIC_SITE_BASE_URL);

	// if (event.url.pathname.startsWith('/api')) {
	// 	response.headers.append('Access-Control-Allow-Origin', `cors`);
	// }
	return response;
};
