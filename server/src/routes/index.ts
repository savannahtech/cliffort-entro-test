import { type Express } from 'express';

import { Route } from './types';
import tasksRoutes from './tasks/tasks.route';

const routes: Route[] = [...tasksRoutes];

export function createRoutes(app: Express) {
	routes.forEach(([path, method, handler]) => {
		app[method](path, handler);
	});
}
