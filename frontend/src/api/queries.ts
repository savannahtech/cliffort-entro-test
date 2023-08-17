// all query functions for react-query should be written here

import { AxiosError } from 'axios';
import { API } from './http-common';

export const Queries = {
	getAllTasks: async () => {
		const response = await API.get('/tasks');
		console.log(response.data);
		return response.data.data.tasks;
	},
};

export const allQueryOptions = {
	retry: 1,
	onError: (error: AxiosError) => {
		console.error(`${error.request.status === 500 ? 'Internal Server Error' : error.message}, please try again later`);
	},
};
