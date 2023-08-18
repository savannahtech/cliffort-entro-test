import { Status, type Task } from '@prisma/client';
import { TasksService } from './tasks.service';
import { route } from '../../_services/route';
import { type RequestData } from 'src/_services/types';
import { PrismaInstance } from '../../_services/PrismaSingleton';

export interface TaskListQuery {
	search?: string;
	status?: Status[];
}

export interface TaskIdParam {
	taskId?: string;
}

export interface DuplicateTaskPayload {
	title?: string;
}

const service = new TasksService();
export class TasksController {
	static _prismaClient = PrismaInstance;

	@route()
	async getTasks({ query }: RequestData<unknown, TaskListQuery>) {
		return service.getTasks(query);
	}

	@route()
	async getTaskDetails({ params }: RequestData<unknown, unknown, TaskIdParam>) {
		return service.getTaskDetails(params.taskId);
	}

	@route()
	async createTask({ payload }: RequestData<Task, unknown, unknown>) {
		return service.createTask(payload);
	}

	@route()
	async updateTask({ payload, params }: RequestData<Task, unknown, TaskIdParam>) {
		return service.updateTask(params.taskId, payload);
	}

	@route()
	async deleteTask({ params }: RequestData<Task, unknown, TaskIdParam>) {
		return service.deleteTask(params.taskId);
	}

	@route()
	async duplicateTask({ params, payload }: RequestData<DuplicateTaskPayload, unknown, TaskIdParam>) {
		return service.duplicateTask(params.taskId, payload);
	}
}
