import express from 'express';

import { createRoutes } from './routes';
import { handle404Error, handleUncaughtErrors } from './errors';

export function createServer() {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	createRoutes(app);

	// error handlers
	app.use(handle404Error);
	app.use(handleUncaughtErrors);

	return app;
}
