import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskCard } from '.';
import CustomButton from '../customs/Button';
import { Divider, Stack, Typography, Chip, Box } from '@mui/material';
import { GrAdd } from 'react-icons/gr';
import { TaskCardDetailsTabs } from './TaskCardDetailsTabs';
import { Inter } from 'next/font/google';
import { ICommonModalProps, ITaskFromAPI } from '@/types';
import { Queries, allQueryOptions } from '@/api/queries';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { CustomLoader } from '../customs/Loader';
import { toast } from 'react-toastify';
import { formatDateToDisplay } from '@/utils';
import { FAILED_TO_FETCH_MESSAGE } from '@/constants';

const inter = Inter({ subsets: ['latin'] });

interface Props extends ICommonModalProps {
	taskId: string;
}

export const TaskDetailsModal = ({ isOpen, handleCloseModal, taskId }: Props) => {
	const {
		data: taskDetails,
		isLoading: isLoadingTaskDetails,
		error: taskDetailsFetchingError,
	} = useQuery<ITaskFromAPI, AxiosError>(
		['task-details', taskId],
		() => Queries.getTaskDetails(taskId),
		allQueryOptions,
	);

	console.log({ taskId });

	if (taskDetailsFetchingError) {
		toast.error(taskDetailsFetchingError.message || FAILED_TO_FETCH_MESSAGE);
	}

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
								<Chip label={taskDetails.assignee.name || 'Unassigned'} />
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
							<CustomButton btnText="Link to other tabs" variant="text" startIcon={<GrAdd />} />
						</Stack>
					</Stack>
				) : (
					'No details'
				)}
			</DialogContent>
			<DialogActions>
				<CustomButton btnText="Close" btnType="primary" onClick={handleCloseModal} />
			</DialogActions>
		</Dialog>
	);
};
