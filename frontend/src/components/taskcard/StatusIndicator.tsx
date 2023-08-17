import { statusBgColors } from '@/constants';
import { Status } from '@/types';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
	status: Status;
}

export const StatusIndicator = ({ status }: Props) => {
	return (
		<Box component="span" sx={{ p: 1, border: '1px solid #DFE3EB' }} borderRadius={2}>
			<Typography textTransform={'lowercase'}>{status === 'IN_PROGRESS' ? 'in progress' : status}</Typography>
		</Box>
	);
};
