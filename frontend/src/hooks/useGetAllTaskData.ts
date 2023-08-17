import { Queries, allQueryOptions } from '@/api/queries';
import { Status, TaskListQuery, TaskListType } from '@/types';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useGetAllTaskData = (queryParams?: TaskListQuery | null) => {
	const {
		data: allTasks,
		isLoading: isLoadingTasks,
		error: tasksFetchingError,
		refetch,
	} = useQuery<TaskListType, AxiosError>(
		['tasks', queryParams],
		() =>
			Queries.getAllTasks({
				...queryParams,
				status: queryParams?.status?.map((item) => item.replace(' ', '_')) as Status[],
			}),
		allQueryOptions,
	);

	return {
		allTasks,
		isLoadingTasks,
		tasksFetchingError,
		refetchAllTasks: refetch,
	};
};
