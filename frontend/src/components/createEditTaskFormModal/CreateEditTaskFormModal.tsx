import {
	Autocomplete,
	Box,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Inter } from 'next/font/google';
import React from 'react';
import CustomButton from '../customs/Button';
import { title } from 'process';
import { BiTask } from 'react-icons/bi';
import { MdAddTask } from 'react-icons/md';
import { InitialForm } from './InitialForm';
import { MoreOptionalDetailsForm } from './MoreOptionalDetailsForm';

const inter = Inter({ subsets: ['latin'] });

interface Props {
	isOpen: boolean;
	handleCloseModal: () => void;
}

export const CreateEditTaskFormModal = ({ isOpen, handleCloseModal }: Props) => {
	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby="task-details-modal"
			aria-describedby="scroll-dialog-description"
			maxWidth="lg"
			className={inter.className}
		>
			<DialogTitle id="task-details-modal">Create New Task</DialogTitle>
			<DialogContent dividers={true}>
				<Box width="60vw">
					<InitialForm />
					<MoreOptionalDetailsForm />
				</Box>
			</DialogContent>
			<DialogActions>
				<CustomButton btnText="Next" btnType="primary" onClick={handleCloseModal} />
				<CustomButton btnText="Finish" btnType="tertiary" onClick={handleCloseModal} />
			</DialogActions>
		</Dialog>
	);
};
