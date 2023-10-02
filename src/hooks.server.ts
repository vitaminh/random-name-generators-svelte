import { error, type Handle } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

export const handle: Handle = async ({ resolve, event }) => {
	console.log(event.route);
	if (event.url.pathname.startsWith('/api')) {
		const referer = event.request.headers.get('referer');
		const fullRoute = PUBLIC_SITE_BASE_URL + event.route.id?.slice(4);

		console.log('fullroute: ' + fullRoute);
		console.log('referer: ' + referer);

		if (referer != fullRoute) {
			throw error(401);
		}
	};
	return await resolve(event);
};
