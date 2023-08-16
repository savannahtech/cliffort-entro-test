import { PrismaClient, Status } from '@prisma/client';
import { TaskListQuery } from './tasks.controller';

export class TasksService {
	get _prismaClient() {
		return new PrismaClient();
	}

	async getTasks(query: TaskListQuery) {
		const filter: Record<'OR' | 'AND' | string, any> = {
			OR: [],
			AND: [],
		};

		if (query.search) {
			filter.OR.push(
				...[
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
				],
			);
		}

		if (query.status) {
			const transformedStatuses: Status[] = [];
			for (const status of query.status) {
				if (status.toUpperCase() in Status) {
					transformedStatuses.push(status.toUpperCase() as Status);
				}
			}

			filter.status = {
				in: transformedStatuses,
			};
		}
		const tasks = await this._prismaClient.task.findMany({
			orderBy: {
				creationDate: 'desc',
			},
			where: this.normalizeFilters(filter),
		});

		return { tasks, count: tasks.length };
	}

	private normalizeFilters(filter: Record<string, any>): Record<string, any> {
		const updatedFilter = { ...filter };
		const keys = Object.keys(filter);
		keys.forEach((key) => {
			if (Array.isArray(filter[key]) && filter[key].length === 0) {
				delete updatedFilter[key];
			}
		});

		return updatedFilter;
	}
}
