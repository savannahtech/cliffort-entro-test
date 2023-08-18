import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomButton } from '../customs';
import { Divider, Stack, Typography, Chip, Box } from '@mui/material';
import { TaskCardDetailsTabs } from './TaskCardDetailsTabs';
import { Inter } from 'next/font/google';
import { ICommonModalProps, ITaskFromAPI } from '@/types';
import { Queries, allQueryOptions } from '@/api/queries';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { CustomLoader } from '../customs';
import { toast } from 'react-toastify';
import { formatDateToDisplay } from '@/utils';
import { FAILED_TO_FETCH_MESSAGE } from '@/constants';
import { Mutations } from '@/api/mutations';
import { useGetAllTaskData } from '@/hooks';
import React, { useState } from 'react';
import { DuplicateTaskFormModal } from '../duplicateTaskFormModal';
import { CreateEditTaskFormModal } from '../createEditTaskFormModal';
import { ModalCloseIconButton } from '../customs/ModalCloseIconButton';
import { TaskCard } from '../taskcard';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	taskId: string;
}

export const TaskDetailsModal = ({ isOpen, handleCloseModal, taskId }: Props) => {
	const [isOpenDuplicateTaskFormModal, setIsOpenDuplicateTaskFormModal] = useState(false);
	const [isOpenEditTaskForm, setIsOpenEditTaskForm] = useState(false);
	const { refetchAllTasks } = useGetAllTaskData();
	const {
		data: taskDetails,
		isLoading: isLoadingTaskDetails,
		error: taskDetailsFetchingError,
		refetch: refetchTaskDetails,
	} = useQuery<ITaskFromAPI, AxiosError>(
		['task-details', taskId],
		() => Queries.getTaskDetails(taskId),
		allQueryOptions,
	);
	const { mutateAsync: deleteTaskMutateAsync, isLoading: isDeleteTaskLoading } = useMutation(Mutations.deleteTask, {
		onError: (error: AxiosError) => {
			toast.error(`${error.message}, Please try again!`, {
				className: 'text-danger',
			});
		},
		onSuccess: (data) => {
			toast.success(data.message);
			handleCloseModal();
			refetchAllTasks();
		},
	});

	const toggleIsOpenDuplicateTaskFormModal = () => {
		setIsOpenDuplicateTaskFormModal((prev) => !prev);
	};

	const toggleShowEditTaskFormModal = () => {
		setIsOpenEditTaskForm((prev) => !prev);
	};

	if (taskDetailsFetchingError) {
		toast.error(taskDetailsFetchingError.message || FAILED_TO_FETCH_MESSAGE);
	}

	const handleDeleteTaskClick = () => {
		taskDetails?.id && deleteTaskMutateAsync(taskDetails.id);
	};

	const handleDuplicateTaskClick = () => {
		toggleIsOpenDuplicateTaskFormModal();
	};

	const handleEditTaskClick = () => {
		toggleShowEditTaskFormModal();
	};

	return (
		<React.Fragment key={`${isLoadingTaskDetails}`}>
			<Dialog
				open={isOpen}
				onClose={handleCloseModal}
				aria-labelledby="task-details-modal"
				aria-describedby="scroll-dialog-description"
				maxWidth="lg"
				className={inter.className}
			>
				<DialogTitle id="task-details-modal">Task Details</DialogTitle>
				<ModalCloseIconButton handleCloseModal={handleCloseModal} />
				<DialogContent dividers={true}>
					<CustomLoader loading={isLoadingTaskDetails} width={'60vh'} />
					{!!taskDetails && (
						<TaskCard
							data={{
								id: taskDetails.id,
								title: taskDetails.title,
								assignee: taskDetails.assignee,
								creationDate: taskDetails.creationDate,
								status: taskDetails.status,
							}}
							isShowStatusIndicator={false}
						/>
					)}
					<Stack mt={2}>
						<Divider />
					</Stack>
					{taskDetails ? (
						<Stack p={3} pt={4}>
							<Stack direction={'row'} columnGap={10}>
								<Stack gap={1}>
									<Typography>Status</Typography>
									<Chip label={taskDetails?.status?.replace('_', ' ')} />
								</Stack>
								<Stack gap={1}>
									<Typography>Date created</Typography>
									<Chip label={formatDateToDisplay(taskDetails.creationDate)} />
								</Stack>
								<Stack gap={1}>
									<Typography>Assignee</Typography>
									<Chip label={taskDetails.assignee?.name || 'Unassigned'} />
								</Stack>
							</Stack>
							<Stack gap={1} mt={3.5}>
								<Typography>Description</Typography>
								<Box
									sx={{
										bgcolor: '#EEF2F8',
									}}
									p={3}
									paddingBottom={5}
									borderRadius={2}
								>
									{taskDetails?.description || ''}
								</Box>
							</Stack>
							<Stack mt={5}>
								<TaskCardDetailsTabs relatedTasks={taskDetails.relatedTasks} />
							</Stack>
						</Stack>
					) : (
						'No details'
					)}
				</DialogContent>
				{taskDetails?.id && (
					<DialogActions>
						<CustomButton btnText="Duplicate" color="info" onClick={handleDuplicateTaskClick} />
						<CustomButton btnText="Edit" color="success" onClick={handleEditTaskClick} />
						<CustomButton
							btnText="Delete"
							color="error"
							onClick={handleDeleteTaskClick}
							isLoading={isDeleteTaskLoading}
						/>
					</DialogActions>
				)}
			</Dialog>
			{isOpenDuplicateTaskFormModal && (
				<DuplicateTaskFormModal
					isOpen={isOpenDuplicateTaskFormModal}
					handleCloseModal={toggleIsOpenDuplicateTaskFormModal}
					currentTaskId={taskDetails?.id ? taskDetails?.id : ''}
					currentTaskTitle={taskDetails?.title ? taskDetails?.title : ''}
					handleCloseDetailsModal={handleCloseModal}
				/>
			)}
			{isOpenEditTaskForm && (
				<CreateEditTaskFormModal
					isOpen={isOpenEditTaskForm}
					handleCloseModal={toggleShowEditTaskFormModal}
					refetchAllTasks={refetchAllTasks}
					refetchTaskDetails={refetchTaskDetails}
					key={`${isOpenEditTaskForm}`}
					mode="edit"
					existingTaskDetails={{
						title: taskDetails?.title ? taskDetails?.title : '',
						assigneeId: taskDetails?.assignee.id || '',
						description: taskDetails?.description || '',
						relatedTask: undefined,
						assignee: {
							label: taskDetails?.assignee.name,
							id: taskDetails?.assignee.id,
						},
						status: taskDetails?.status,
					}}
				/>
			)}
		</React.Fragment>
	);
};
