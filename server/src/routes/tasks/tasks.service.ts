import { PrismaClient } from '@prisma/client';
import { TaskListQuery } from './tasks.controller';

export class TasksService {
	get _prismaClient() {
		return new PrismaClient();
	}

	async getTasks(query: TaskListQuery) {
		const filter: any = {};

		if (query.search) {
			filter.OR = [
				{
					title: {
						contains: query.search,
						mode: 'insensitive',
					},
				},
				{
					assigneeName: {
						contains: query.search,
						mode: 'insensitive',
					},
				},
			];
		}

		const tasks = await this._prismaClient.task.findMany({
			orderBy: {
				creationDate: 'desc',
			},
			where: filter,
		});

		return { tasks, count: tasks.length };
	}
}
