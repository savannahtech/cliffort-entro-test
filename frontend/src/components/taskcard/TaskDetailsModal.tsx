import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskCard } from '.';
import { CustomButton } from '../customs';
import { Divider, Stack, Typography, Chip, Box, IconButton } from '@mui/material';
import { GrAdd, GrClose } from 'react-icons/gr';
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
import { Theme } from '@mui/system';
import { Mutations } from '@/api/mutations';
import { useGetAllTaskData } from '@/hooks';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	taskId: string;
}

export const TaskDetailsModal = ({ isOpen, handleCloseModal, taskId }: Props) => {
	const { refetchAllTasks } = useGetAllTaskData();
	const {
		data: taskDetails,
		isLoading: isLoadingTaskDetails,
		error: taskDetailsFetchingError,
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

	if (taskDetailsFetchingError) {
		toast.error(taskDetailsFetchingError.message || FAILED_TO_FETCH_MESSAGE);
	}

	const handleDeleteTaskClick = () => {
		console.log('delete', taskDetails?.id);
		taskDetails?.id && deleteTaskMutateAsync(taskDetails.id);
	};

	const handleDuplicateTaskClick = () => {
		console.log('delete', taskDetails?.id);
	};

	const handleEditTaskClick = () => {
		console.log('delete', taskDetails?.id);
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
			<DialogTitle id="task-details-modal">Task Details</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleCloseModal}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme: Theme) => theme.palette.grey[500],
				}}
			>
				<GrClose />
			</IconButton>
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
								<Chip label={taskDetails?.status} />
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
						<Stack direction={'row'} mt={2}>
							<CustomButton btnText="Link to other task" variant="text" startIcon={<GrAdd />} />
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
	);
};
