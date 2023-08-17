import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import CustomButton from '../customs/Button';
import { InitialForm } from './InitialForm';
import { MoreOptionalDetailsForm } from './MoreOptionalDetailsForm';
import { ICommonModalProps, ICreateEditTaskFormValues } from '@/types';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {}

export const CreateEditTaskFormModal = ({ isOpen, handleCloseModal }: Props) => {
	const [isShowMoreDetailsForm, setIsShowMoreDetailsForm] = useState(false);
	const [formValues, setFormValues] = useState<ICreateEditTaskFormValues>({
		title: '',
		assigneeName: '',
		description: '',
		relatedTask: undefined,
	});

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
		console.log({ formValues });
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
						// TODO: add some validation before show the more optional details form
						toggleIsShowMoreDetailsForm();
					}}
				/>
				<CustomButton btnText="Finish" btnType="tertiary" onClick={handleCreateTask} />
			</DialogActions>
		</Dialog>
	);
};
