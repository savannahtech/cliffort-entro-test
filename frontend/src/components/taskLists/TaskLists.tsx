import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { TaskCard } from '../taskcard';
import { TaskListType } from '@/types';
import { EmptyTaskList } from '../emptyTaskList';
import { useCurrentTaskIdContext } from '@/context';
import { TaskDetailsModal } from '../taskDetailsModal';

interface Props {
	taskLists: TaskListType;
}

export const TaskLists = ({ taskLists }: Props) => {
	const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
	const { updateCurrentTaskId, currentTaskId } = useCurrentTaskIdContext();

	const toggleShowTaskDetailsModal = () => {
		setIsOpenDetailsModal((prev) => !prev);
	};

	const handleTaskCardClick = (taskId: string) => {
		toggleShowTaskDetailsModal();
		updateCurrentTaskId(taskId);
	};
	return (
		<>
			<Stack direction={'column'} rowGap={3}>
				{!taskLists?.length ? (
					<EmptyTaskList />
				) : (
					taskLists.map((task) => (
						<Stack key={task.id}>
							<Box
								borderRadius={2}
								border={'1px solid #10182808'}
								sx={{
									cursor: 'pointer',
								}}
								padding={2}
								boxShadow={`0px 4px 6px -2px #10182808`}
								onClick={() => handleTaskCardClick(task.id)}
							>
								<TaskCard data={task} />
							</Box>
						</Stack>
					))
				)}
			</Stack>
			{currentTaskId && (
				<TaskDetailsModal
					isOpen={isOpenDetailsModal}
					handleCloseModal={toggleShowTaskDetailsModal}
					taskId={currentTaskId}
				/>
			)}
		</>
	);
};
