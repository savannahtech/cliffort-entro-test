import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { TaskCard } from '../taskcard';
import { TaskDetailsModal } from '../taskcard/TaskDetailsModal';
import { TaskListType } from '@/types';
import { EmptyTaskList } from '../emptyTaskList';

interface Props {
	taskLists: TaskListType;
}

export const TaskLists = ({ taskLists }: Props) => {
	const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

	const toggleShowTaskDetailsModal = () => {
		setIsOpenDetailsModal((prev) => !prev);
	};

	const handleTaskCardClick = () => {
		// todo: add details
		toggleShowTaskDetailsModal();
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
								onClick={handleTaskCardClick}
							>
								<TaskCard data={task} />
							</Box>
						</Stack>
					))
				)}
			</Stack>
			<TaskDetailsModal isOpen={isOpenDetailsModal} handleCloseModal={toggleShowTaskDetailsModal} />
		</>
	);
};
