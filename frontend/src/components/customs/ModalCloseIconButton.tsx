import { IconButton, IconButtonProps, Theme } from '@mui/material';
import React from 'react';
import { GrClose } from 'react-icons/gr';

interface Props extends IconButtonProps {
	handleCloseModal: () => void;
}

export const ModalCloseIconButton = ({ handleCloseModal }: Props) => {
	return (
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
	);
};
