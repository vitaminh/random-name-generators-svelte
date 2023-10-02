import type { Handle } from '@sveltejs/kit';

import { PUBLIC_SITE_HOSTNAME } from '$env/static/public';

export const handle: Handle = async ({ resolve, event }) => {
	console.log(event.request);
	console.log(event.request.headers);
	event.request.headers.forEach(header => console.log(header));
	const referer = event.request.headers.get('referer');
	console.log('referer: ' + referer);
	return await resolve(event);
};
