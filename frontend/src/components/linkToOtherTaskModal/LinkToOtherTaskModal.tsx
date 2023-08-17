import { useGetAllTaskData } from '@/hooks';
import { ICommonModalProps, ITaskFromAPI, RelatedTaskType } from '@/types';
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import CustomButton from '../customs/Button';
const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	getSelectedTask: (task?: RelatedTaskType) => void;
}

export const LinkToOtherTaskModal = ({ isOpen, handleCloseModal, getSelectedTask }: Props) => {
	const [selectedTask, setSelectedTask] = useState<RelatedTaskType>(undefined);
	const { allTasks } = useGetAllTaskData();

	// TODO: implement functionality to populate existing data if there is one.

	const handleDoneClick = () => {
		getSelectedTask(selectedTask);
		handleCloseModal();
	};

	const handleCancelClick = () => {
		setSelectedTask(undefined);
		handleCloseModal();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby="task-details-modal"
			aria-describedby="scroll-dialog-description"
			maxWidth="lg"
			className={inter.className}
		>
			<DialogTitle id="create-task-modal">Link Task to Existing Task</DialogTitle>
			<DialogContent dividers={true}>
				<Box width="50vw">
					<Autocomplete
						disablePortal
						id="relatedTask"
						options={
							allTasks?.map((item) => ({
								label: item.title,
								id: item.id,
							})) || []
						}
						sx={{ width: 250 }}
						renderInput={(params) => <TextField {...params} label="Existing Task" variant="standard" />}
						onChange={(_e, newValue) => {
							const selectedTask = allTasks?.find((item) => item.id === newValue?.id);
							setSelectedTask(selectedTask);
						}}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<CustomButton btnText="Cancel" btnType="tertiary" onClick={handleCancelClick} />
				<CustomButton btnText="Done" btnType="primary" onClick={handleDoneClick} />
			</DialogActions>
		</Dialog>
	);
};
