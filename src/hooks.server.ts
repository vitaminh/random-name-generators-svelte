import { error, type Handle } from '@sveltejs/kit';

import { PUBLIC_SITE_BASE_URL } from '$env/static/public';

export const handle: Handle = async ({ resolve, event }) => {

	if (event.url.pathname.startsWith('/api')) {
		// Prevent API calls from Postman and other sites
		const referer: string | null = event.request.headers.get('referer');
		const fullRoute: string = PUBLIC_SITE_BASE_URL + event.route.id?.slice(4);

		if (referer != fullRoute) {
			throw error(401);
		}
	};

	const response: Response = await resolve(event);
	response.headers.set('X-Frame-Options', 'DENY');
	return response;
	// return await resolve(event);
};
