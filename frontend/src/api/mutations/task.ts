import { ICreateTaskPayload } from '@/types';
import { API } from '../http-common';

export const Task = {
	createNewTask: async (values: ICreateTaskPayload) => {
		const { data } = await API.post('/tasks', { data: values });
		return data;
	},
	deleteTask: async (taskId: string) => {
		const response = await API.delete(`/tasks/${taskId}`);
		return response.data.data;
	},
	// add the rest
};
