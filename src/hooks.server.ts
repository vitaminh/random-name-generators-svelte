import type { Handle } from '@sveltejs/kit';

import { PUBLIC_SITE_HOSTNAME } from '$env/static/public';

export const handle: Handle = async ({ resolve, event }) => {
	const hostname: string | null = event.request.headers.get('host');
	console.log('hostname: ' + hostname);
	console.log( `host matches: ${ hostname == PUBLIC_SITE_HOSTNAME}`);
	console.log('isSubRequest: ' + event.isSubRequest);
	return await resolve(event);
};
