import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TbDatabaseOff } from 'react-icons/tb';

export const EmptyTaskList = () => {
	return (
		<Stack justifyContent={'center'} alignItems={'center'}>
			<Stack direction={'column'} gap={2}>
				<TbDatabaseOff style={{ width: 50, height: 50 }} />
				<Typography>No Data</Typography>
			</Stack>
		</Stack>
	);
};
