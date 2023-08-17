export type CustomButtonTypes = 'primary' | 'secondary' | 'tertiary';

export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface IAssignee {
	id: string;
	name: string;
	avatar: string;
}
export interface ITaskFromAPI {
	id: string;
	title: string;
	assignee: IAssignee;
	status: Status;
	creationDate: Date;
	relatedTasks?: TaskListType;
	description?: string;
	watchers?: IAssignee[];
}

export type TaskListType = Omit<ITaskFromAPI, 'relatedTasks' | 'description' | 'watchers'>[];

export interface ICreateEditTaskFormValues {
	title: string;
	assigneeName: string;
	description: string;
	relatedTask: RelatedTaskType;
}

interface ICommonModalProps {
	isOpen: boolean;
	handleCloseModal: () => void;
}

export type RelatedTaskType = Omit<ITaskFromAPI, 'relatedTasks' | 'description' | 'watchers'> | undefined;
