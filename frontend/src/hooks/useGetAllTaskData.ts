import { Queries, allQueryOptions } from '@/api/queries';
import { TaskListType } from '@/types';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useGetAllTaskData = () => {
	const {
		data: allTasks,
		isLoading: isLoadingTasks,
		error: tasksFetchingError,
	} = useQuery<TaskListType, AxiosError>('tasks', Queries.getAllTasks, allQueryOptions);

	return {
		allTasks,
		isLoadingTasks,
		tasksFetchingError,
	};
};
