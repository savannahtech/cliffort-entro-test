import { HttpMethod, Route } from '../types';
import { UsersController } from './users.controller';

const controller = new UsersController();

const tasksRoutes: Route[] = [['/users', HttpMethod.Get, controller.getUsers]];

export default tasksRoutes;
