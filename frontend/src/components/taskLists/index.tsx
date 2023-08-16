import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { TaskCard } from '../taskcard';
import { TaskDetailsModal } from '../taskcard/TaskDetailsModal';

export const TaskLists = () => {
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
				<Stack>
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
						<TaskCard />
					</Box>
				</Stack>
				<Stack>
					<Box
						borderRadius={2}
						border={'1px solid #10182808'}
						sx={{
							cursor: 'pointer',
						}}
						padding={2}
						boxShadow={`0px 4px 6px -2px #10182808`}
					>
						<TaskCard />
					</Box>
				</Stack>
				<Stack>
					<Box
						borderRadius={2}
						border={'1px solid #10182808'}
						sx={{
							cursor: 'pointer',
						}}
						padding={2}
						boxShadow={`0px 4px 6px -2px #10182808`}
					>
						<TaskCard />
					</Box>
				</Stack>
			</Stack>
			<TaskDetailsModal isOpen={isOpenDetailsModal} handleCloseModal={toggleShowTaskDetailsModal} />
		</>
	);
};
