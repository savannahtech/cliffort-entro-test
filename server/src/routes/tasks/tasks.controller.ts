import { PrismaClient, Status } from '@prisma/client';
import { TasksService } from './tasks.service';
import { route } from '../../_services/route';
import { RequestData } from 'src/_services/types';

export interface TaskListQuery {
	search?: string;
	status?: Status[];
}

const service = new TasksService();
export class TasksController {
	static _prismaClient = new PrismaClient();

	@route()
	async getTasks({ query }: RequestData<unknown, TaskListQuery>) {
		return service.getTasks(query);
	}

	@route()
	async getTaskDetails({ params }: RequestData<unknown, unknown, { taskId?: string }>) {
		return service.getTaskDetails(params.taskId);
	}
}
