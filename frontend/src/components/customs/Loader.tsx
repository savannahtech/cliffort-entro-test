import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { text } from 'stream/consumers';

interface Props {
	loading: boolean;
	text?: string;
	height?: string | number;
	width?: string | number;
}

export const CustomLoader = ({ text = 'Loading...', loading, height = '80vh', width }: Props) => {
	if (!loading) {
		return null;
	}

	return (
		<Box display="flex" alignItems="center" justifyContent="center" height={height} width={width ? width : undefined}>
			<CircularProgress />
			<Typography variant="body1" sx={{ marginLeft: 2 }}>
				{text}
			</Typography>
		</Box>
	);
};
