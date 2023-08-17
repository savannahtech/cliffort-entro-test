export type CustomButtonTypes = 'primary' | 'secondary' | 'tertiary';

export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Assignee {
	name: string;
	avatar: string;
}
export interface ITaskFromAPI {
	id: string;
	title: string;
	assignee: Assignee;
	status: Status;
	creationDate: Date;
	relatedTasks?: TaskListType;
	description?: string;
	watchers?: Assignee[];
}

export type TaskListType = Omit<ITaskFromAPI, 'relatedTasks' | 'description' | 'watchers'>[];

export interface ICreateEditTaskFormValues {
	title: string;
	assigneeName: string;
	description: string;
	relatedTask: string | null;
}
