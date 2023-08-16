import express from 'express';

import { createRoutes } from './routes';

export function createServer() {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	createRoutes(app);

	return app;
}
