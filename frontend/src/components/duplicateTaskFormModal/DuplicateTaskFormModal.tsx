import { ICommonModalProps } from '@/types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Box } from '@mui/system';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react';
import { CustomButton } from '../customs';
import { Mutations } from '@/api/mutations';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useGetAllTaskData } from '@/hooks';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	currentTaskTitle: string;
	currentTaskId: string;
	handleCloseDetailsModal: () => void;
}

export const DuplicateTaskFormModal = ({
	isOpen,
	handleCloseModal,
	currentTaskId,
	currentTaskTitle,
	handleCloseDetailsModal,
}: Props) => {
	const { refetchAllTasks } = useGetAllTaskData();
	const mutatationsOptions = {
		onError: (error: AxiosError) => {
			toast.error(`${error.message}, Please try again!`, {
				className: 'text-danger',
			});
		},
		onSuccess: (data: any) => {
			toast.success(data.message);
			refetchAllTasks();
			// close both modals
			handleCloseModal();
			handleCloseDetailsModal();
		},
	};

	const [title, setTitle] = useState(`Copy of ${currentTaskTitle}`);
	// duplicate task mutation
	const { mutateAsync: duplicateTaskMutateAsync, isLoading: isDuplicateTaskLoading } = useMutation(
		Mutations.duplicateTask,
		mutatationsOptions,
	);

	const handleCancelClick = () => {
		handleCloseModal();
	};

	const handleDoneClick = () => {
		duplicateTaskMutateAsync({
			payload: { title },
			taskId: currentTaskId,
		});
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
			<DialogTitle id="create-task-modal">Duplicating Task: {currentTaskTitle}</DialogTitle>
			<DialogContent dividers={true}>
				<Box width="50vw" minHeight={'250px'} display={'flex'} gap={2}>
					<Image
						src={'https://res.cloudinary.com/dhs3t6x02/image/upload/v1692318969/Secret-Icon_1_li93dw.svg'}
						width={64}
						height={64}
						alt="task-icon"
					/>
					<TextField
						id="task-title"
						label="Task Title"
						variant="standard"
						fullWidth
						name="title"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						value={title}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<CustomButton btnText="Cancel" btnType="tertiary" onClick={handleCancelClick} />
				<CustomButton btnText="Done" btnType="primary" onClick={handleDoneClick} isLoading={isDuplicateTaskLoading} />
			</DialogActions>
		</Dialog>
	);
};
