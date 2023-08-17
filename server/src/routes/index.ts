import { type Express } from 'express';

import { Route } from './types';
import tasksRoutes from './tasks/tasks.route';
import usersRoutes from './users/users.route';

const routes: Route[] = [...tasksRoutes, ...usersRoutes];

export function createRoutes(app: Express) {
	routes.forEach(([path, method, handler]) => {
		app[method](path, handler);
	});
}
