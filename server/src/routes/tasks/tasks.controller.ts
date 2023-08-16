import { PrismaClient } from '@prisma/client';
import { TasksService } from './tasks.service';
import { route } from '../../_services/route';
import { RequestData } from 'src/_services/types';

export interface TaskListQuery {
	search?: string;
}

const service = new TasksService();
export class TasksController {
	static _prismaClient = new PrismaClient();

	@route()
	async getTasks({ query }: RequestData<unknown, TaskListQuery>) {
		return service.getTasks(query);
	}
}
