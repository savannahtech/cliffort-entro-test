import { PrismaClient } from '@prisma/client';

export class TasksService {
	get _prismaClient() {
		return new PrismaClient();
	}

	async getTasks() {
		return this._prismaClient.task.findMany({ include: { relatedTasks: true } });
	}
}
