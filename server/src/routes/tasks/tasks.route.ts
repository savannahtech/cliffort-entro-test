import { HttpMethod, Route } from '../types';
import { TasksController } from './tasks.controller';

const controller = new TasksController();

const tasksRoutes: Route[] = [
	['/tasks', HttpMethod.Get, controller.getTasks],
	['/tasks/:taskId', HttpMethod.Get, controller.getTaskDetails],
	['/tasks', HttpMethod.Post, controller.createTask],
	['/tasks/:taskId', HttpMethod.Patch, controller.updateTask],
];

export default tasksRoutes;
