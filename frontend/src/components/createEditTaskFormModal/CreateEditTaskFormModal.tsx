import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import { CustomButton } from '../customs';
import { InitialForm } from './InitialForm';
import { MoreOptionalDetailsForm } from './MoreOptionalDetailsForm';
import {
	ICommonModalProps,
	ICreateEditTaskFormValues,
	ICreateTaskPayload,
	IUpdateTaskPayload,
	TaskFormModeType,
} from '@/types';
import { Mutations } from '@/api/mutations';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ModalCloseIconButton } from '../customs/ModalCloseIconButton';
import { useCurrentTaskIdContext } from '@/context';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	refetchAllTasks: Function;
	mode: TaskFormModeType;
	existingTaskDetails?: ICreateEditTaskFormValues; // for edit
	refetchTaskDetails?: Function;
}

export const CreateEditTaskFormModal = ({
	isOpen,
	handleCloseModal,
	refetchAllTasks,
	existingTaskDetails,
	mode,
	refetchTaskDetails,
}: Props) => {
	const isInEditMode = mode === 'edit';
	const isInCreateMode = mode === 'create';
	const mutatationsOptions = {
		onError: (error: AxiosError) => {
			toast.error(`${error.message}, Please try again!`, {
				className: 'text-danger',
			});
		},
		onSuccess: (data: any) => {
			console.log(data);
			toast.success(data.message);
			handleCloseModal();
			isInCreateMode && refetchAllTasks();
			isInEditMode && refetchTaskDetails && refetchTaskDetails();
		},
	};
	const [isShowMoreDetailsForm, setIsShowMoreDetailsForm] = useState(isInEditMode);
	const [formValues, setFormValues] = useState<ICreateEditTaskFormValues>(
		isInEditMode && existingTaskDetails
			? existingTaskDetails
			: {
					title: '',
					assigneeId: '',
					description: '',
					relatedTask: undefined,
			  },
	);
	// create task mutation
	const { mutateAsync: createNewTaskMutateAsync, isLoading: isCreaetTaskLoading } = useMutation(
		Mutations.createNewTask,
		mutatationsOptions,
	);
	const { currentTaskId } = useCurrentTaskIdContext();

	// edit task mutation
	const { mutateAsync: updateTaskMutateAsync, isLoading: isUpdateTaskLoading } = useMutation(
		Mutations.updateTask,
		mutatationsOptions,
	);

	const toggleIsShowMoreDetailsForm = () => {
		setIsShowMoreDetailsForm((prev) => !prev);
	};

	const handleFormValueChange = (fieldName: keyof ICreateEditTaskFormValues, value: any) => {
		setFormValues((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	const handleFinishClick = () => {
		// add validations before saving
		if (!formValues.title) {
			toast.error('Please add a task title');
			return;
		}

		//update
		if (isInEditMode && currentTaskId) {
			const apiPayload: IUpdateTaskPayload = {
				title: formValues.title,
				assigneeId: formValues.assigneeId,
				relatedTaskId: formValues.relatedTask?.id,
				description: formValues.description,
				status: formValues.status!,
			};

			updateTaskMutateAsync({
				taskId: currentTaskId,
				payload: apiPayload,
			});

			return;
		}
		//create
		const apiPayload: ICreateTaskPayload = {
			title: formValues.title,
			assigneeId: formValues.assigneeId,
			relatedTaskId: formValues.relatedTask?.id,
			description: formValues.description,
		};
		createNewTaskMutateAsync(apiPayload);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby="create-task-modal"
			aria-describedby="create-task-modal-description"
			maxWidth="lg"
			className={inter.className}
		>
			<DialogTitle id="create-task-modal">{isInEditMode ? 'Edit Task' : 'Create New Task'}</DialogTitle>
			<ModalCloseIconButton handleCloseModal={handleCloseModal} />
			<DialogContent dividers={true}>
				<Box width={isInEditMode ? '70vw' : '60vw'} minHeight={300}>
					<InitialForm mode={mode} formValues={formValues} handleFormValueChange={handleFormValueChange} />
					{isShowMoreDetailsForm ? (
						<MoreOptionalDetailsForm formValues={formValues} handleFormValueChange={handleFormValueChange} />
					) : null}
				</Box>
			</DialogContent>
			<DialogActions>
				<CustomButton
					btnText={isShowMoreDetailsForm ? 'Back' : 'Next'}
					btnType="primary"
					onClick={() => {
						// validate task title
						if (!isShowMoreDetailsForm && !formValues.title) {
							toast.error('Please add a task title');
							return;
						}
						toggleIsShowMoreDetailsForm();
					}}
				/>
				<CustomButton
					btnText="Finish"
					btnType="tertiary"
					onClick={handleFinishClick}
					isLoading={isCreaetTaskLoading || isUpdateTaskLoading}
				/>
			</DialogActions>
		</Dialog>
	);
};
