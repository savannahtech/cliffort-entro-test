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

interface Props {
	isOpen: boolean;
	handleCloseModal: () => void;
}

export const TaskDetailsModal = ({ isOpen, handleCloseModal }: Props) => {
	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby="task-details-modal"
			aria-describedby="scroll-dialog-description"
		>
			<DialogTitle id="task-details-modal">Task Title</DialogTitle>
			<DialogContent dividers={true}>
				<TaskCard />
				<Divider />
				<Stack p={3} pt={4}>
					<Stack direction={'row'} columnGap={10}>
						<Stack gap={1}>
							<Typography>Status</Typography>
							<Chip label="Chip Filled" />
						</Stack>
						<Stack gap={1}>
							<Typography>Status</Typography>
							<Chip label="Chip Filled" />
						</Stack>
						<Stack gap={1}>
							<Typography>Status</Typography>
							<Chip label="Chip Filled" />
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
							To live is to risk it all. Otherwise {"you're"} just an inert chunk of randomly assembled molecules
							drifting wherever the universe blows you.
						</Box>
					</Stack>
					<Stack mt={5}>
						<TaskCardDetailsTabs />
					</Stack>
					<Stack direction={'row'} mt={2}>
						<CustomButton btnText="Link to other tabs" variant="text" startIcon={<GrAdd />} />
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<CustomButton btnText="Close" btnType="primary" />
			</DialogActions>
		</Dialog>
	);
};
