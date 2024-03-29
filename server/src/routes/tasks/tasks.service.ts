import { Status, type Task } from '@prisma/client';
import { DuplicateTaskPayload, TaskListQuery } from './tasks.controller';
import { TASK_NOT_FOUND_MES } from '../../constants';
import { PrismaInstance } from '../../_services/PrismaSingleton';

export class TasksService {
	static _prismaClient = PrismaInstance;
	get _prismaClient() {
		return PrismaInstance;
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
						assignee: {
							name: {
								contains: query.search,
								mode: 'insensitive',
							},
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
			include: {
				assignee: true,
			},
		});

		return { tasks, count: tasks.length };
	}

	async getTaskDetails(taskId?: string) {
		try {
			const taskDetails = await this._prismaClient.task.findUnique({
				where: {
					id: taskId,
				},
				include: {
					relatedTasks: {
						include: {
							assignee: true,
						},
					},
					assignee: true,
					watchers: true,
				},
			});

			return taskDetails;
		} catch (e) {
			return { error: TASK_NOT_FOUND_MES };
		}
	}

	async createTask(payload: Task) {
		try {
			await this._prismaClient.task.create({
				data: {
					title: payload.title,
					...(payload.relatedTaskId
						? {
								task: {
									connect: {
										id: payload.relatedTaskId,
									},
								},
								relatedTasks: {
									connect: {
										id: payload.relatedTaskId,
									},
								},
						  }
						: {}),
					...(payload.assigneeId
						? {
								assignee: {
									connect: {
										id: payload.assigneeId,
									},
								},
						  }
						: {}),
					description: payload.description,
				},
			});
			return {
				message: 'Task Create successfully',
			};
		} catch (error) {
			return {
				error: `Creation failed: ${
					(typeof error === 'object' && 'message' in error && error.message) || 'An error occurred'
				}`,
			};
		}
	}

	async updateTask(taskId: string, updatedData: Partial<Task>) {
		try {
			if (taskId === updatedData?.relatedTaskId) {
				throw new Error('Cannot relate task to itself');
			}

			const existingTask = await this._prismaClient.task.findUnique({
				where: { id: taskId },
			});

			if (!existingTask) {
				return {
					error: TASK_NOT_FOUND_MES,
				};
			}

			const { title, status, relatedTaskId, assigneeId, description } = updatedData;

			//TODO: add functionality to update assignee data

			// Update the task
			const updatedTask = await this._prismaClient.task.update({
				where: { id: taskId },
				data: {
					title: title || existingTask.title,
					status: status || existingTask.status,
					description: description || existingTask.description,
					...(relatedTaskId
						? {
								task: {
									connect: {
										id: relatedTaskId,
									},
								},
						  }
						: {
								task: {
									disconnect: true, // Handle case where related task is removed
								},
						  }),
					...(assigneeId
						? {
								assignee: {
									connect: {
										id: assigneeId,
									},
								},
						  }
						: {
								assignee: {
									disconnect: true, // Handle case where assignee task is removed
								},
						  }),
				},
			});

			return {
				message: 'Task updated successfully',
				updatedTask,
			};
		} catch (error) {
			return {
				error: `Update failed: ${
					(typeof error === 'object' && 'message' in error && error.message) || 'An error occurred'
				}`,
			};
		}
	}

	async deleteTask(taskId: string) {
		try {
			const existingTask = await this._prismaClient.task.findUnique({
				where: { id: taskId },
			});

			if (!existingTask) {
				return {
					error: TASK_NOT_FOUND_MES,
				};
			}

			await this._prismaClient.task.delete({
				where: { id: taskId },
			});

			return {
				message: 'Task deleted successfully',
			};
		} catch (error) {
			return {
				error: `Deletion failed: ${
					(typeof error === 'object' && 'message' in error && error.message) || 'An error occurred'
				}`,
			};
		}
	}

	async duplicateTask(taskId: string, payload: DuplicateTaskPayload) {
		try {
			const existingTask = await this._prismaClient.task.findUnique({
				where: { id: taskId },
			});

			if (!existingTask) {
				return {
					error: TASK_NOT_FOUND_MES,
				};
			}

			const duplicateData: Partial<Task> = {
				...existingTask,
				title: payload?.title || `Copy of ${existingTask.title}`,
			};

			//remove existing id
			delete duplicateData.id;
			const duplicatedTask = await this._prismaClient.task.create({
				data: {
					title: duplicateData.title,
					...duplicateData,
				},
			});

			return {
				message: 'Task duplicated successfully',
				duplicatedTask,
			};
		} catch (error) {
			return {
				error: `Duplication failed: ${
					(typeof error === 'object' && 'message' in error && error.message) || 'An error occurred'
				}`,
			};
		}
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
