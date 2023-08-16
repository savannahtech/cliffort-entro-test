import express from 'express';
import cors from 'cors';

import { createRoutes } from './routes';
import { handle404Error, handleUncaughtErrors } from './errors';

export function createServer() {
	const app = express();
	// allow cors from everywhere
	app.use(
		cors({
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
			optionsSuccessStatus: 204,
		}),
	);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	createRoutes(app);

	// error handlers
	app.use(handle404Error);
	app.use(handleUncaughtErrors);

	return app;
}
