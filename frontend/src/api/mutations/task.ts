import { ICreateTaskPayload } from '@/types';
import { API } from '../http-common';

export const Task = {
	createNewTask: async (values: ICreateTaskPayload) => {
		const { data } = await API.post('/tasks', { data: values });
		return data;
	},
	// add the rest
};
