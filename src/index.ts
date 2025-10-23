/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Cory's Website</title>
	<style>
		body {
			background-color: #1a1a1a;
			color: #e0e0e0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			padding: 2rem;
			margin: 0;
		}
		h1 {
			color: #ffffff;
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}
		p {
			font-size: 1.25rem;
		}
	</style>
</head>
<body>
	<h1>Cory's Website</h1>
	<p>Lovely to see you here! 😘</p>
</body>
</html>`;

		return new Response(html, {
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
			},
		});
	},
} satisfies ExportedHandler<Env>;
