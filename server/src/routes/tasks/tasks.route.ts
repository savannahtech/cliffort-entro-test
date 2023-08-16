import { HttpMethod, Route } from '../types';
import { TasksController } from './tasks.controller';

const controller = new TasksController();

const tasksRoutes: Route[] = [['/tasks', HttpMethod.Get, controller.getTasks]];

export default tasksRoutes;
