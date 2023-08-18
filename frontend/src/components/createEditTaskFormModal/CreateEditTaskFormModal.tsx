import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import { CustomButton } from '../customs';
import { InitialForm } from './InitialForm';
import { MoreOptionalDetailsForm } from './MoreOptionalDetailsForm';
import { ICommonModalProps, ICreateEditTaskFormValues, ICreateTaskPayload } from '@/types';
import { Mutations } from '@/api/mutations';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	refetchAllTasks: Function;
}

export const CreateEditTaskFormModal = ({ isOpen, handleCloseModal, refetchAllTasks }: Props) => {
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
			refetchAllTasks();
		},
	};
	const [isShowMoreDetailsForm, setIsShowMoreDetailsForm] = useState(false);
	const [formValues, setFormValues] = useState<ICreateEditTaskFormValues>({
		title: '',
		assigneeId: '',
		description: '',
		relatedTask: undefined,
	});
	// create task mutation
	const { mutateAsync: createNewTaskMutateAsync, isLoading: isCreaetTaskLoading } = useMutation(
		Mutations.createNewTask,
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

	const handleCreateTask = () => {
		// add validations before saving
		if (!formValues.title) {
			toast.error('Please add a task title');
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
			<DialogTitle id="create-task-modal">Create New Task</DialogTitle>
			<DialogContent dividers={true}>
				<Box width="60vw" minHeight={300}>
					<InitialForm formValues={formValues} handleFormValueChange={handleFormValueChange} />
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
						// add some validation before show the more optional details form
						if (!isShowMoreDetailsForm && !formValues.title) {
							toast.error('Please add a task title');
							return;
						}
						toggleIsShowMoreDetailsForm();
					}}
				/>
				<CustomButton btnText="Finish" btnType="tertiary" onClick={handleCreateTask} isLoading={isCreaetTaskLoading} />
			</DialogActions>
		</Dialog>
	);
};
