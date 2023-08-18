import { SelectProps } from '@mui/material';

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
	assigneeId: string;
	description: string;
	relatedTask: RelatedTaskType;
	assignee?: {
		label?: string;
		id?: string;
	};
	status?: Status;
}

interface ICommonModalProps {
	isOpen: boolean;
	handleCloseModal: () => void;
}

export type RelatedTaskType = Omit<ITaskFromAPI, 'relatedTasks' | 'description' | 'watchers'> | undefined;

export interface ITaskPayload {
	title: string;
	assigneeId?: string;
	description?: string;
	relatedTaskId?: string;
}

export interface ICreateTaskPayload extends ITaskPayload {}

export interface IUpdateTaskPayload extends ITaskPayload {
	status: Status;
}

export interface TaskListQuery {
	search?: string;
	status?: Status[];
}
export interface DuplicateTaskPayload {
	title?: string;
}

export interface CustomSelectInputProps extends Partial<SelectProps> {
	label: string;
	getValue: (value: string | string[]) => void;
}

export type TaskFormModeType = 'create' | 'edit';
