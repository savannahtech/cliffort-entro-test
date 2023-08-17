// all query functions for react-query should be written here

import { AxiosError } from 'axios';
import { API } from './http-common';

export const Queries = {
	getAllTasks: async () => {
		const response = await API.get('/tasks');
		return response.data.data.tasks;
	},

	getTaskDetails: async (taskId: string) => {
		console.log(taskId);
		const response = await API.get(`/tasks/${taskId}`);
		return response.data.data;
	},

	getAllUsers: async () => {
		const response = await API.get('/users');
		return response.data.data.users;
	},
};

export const allQueryOptions = {
	retry: 1,
	onError: (error: AxiosError) => {
		console.error(`${error.request.status === 500 ? 'Internal Server Error' : error.message}, please try again later`);
	},
};
