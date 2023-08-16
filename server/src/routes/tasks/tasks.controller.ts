import { PrismaClient } from '@prisma/client';
import { route } from '../../_services/route';
import { TasksService } from './tasks.service';

const service = new TasksService();

export class TasksController {
	static _prismaClient = new PrismaClient();

	@route()
	async getTasks() {
		return service.getTasks();
	}
}
