import { Stack, Divider, Typography, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from '../customs/Button';
import { GrAdd } from 'react-icons/gr';
import { ICreateEditTaskFormValues } from '@/types';
import { LinkToOtherTaskModal } from '../linkToOtherTaskModal';
import { TaskCard } from '../taskcard';

interface Props {
	handleFormValueChange: (fieldName: keyof ICreateEditTaskFormValues, value: any) => void;
	formValues: ICreateEditTaskFormValues;
}

export const MoreOptionalDetailsForm = ({ handleFormValueChange, formValues }: Props) => {
	const [isOpenLinkToParentTaskModal, setIsOpenLinkToParentTaskModal] = useState(false);
	const toggleLinkToParentTaskModal = () => {
		setIsOpenLinkToParentTaskModal((prev) => !prev);
	};

	return (
		<>
			<Stack mt={2}>
				<Divider />
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
					<TextField
						id="description-tasks"
						name={'description'}
						label=""
						multiline
						maxRows={6}
						variant="standard"
						fullWidth
						onChange={(e) => {
							handleFormValueChange('description', e.target.value);
						}}
						value={formValues.description}
					/>
				</Box>
				<Stack direction={'row'} mt={2}>
					<Typography variant="subtitle1" pb={1} borderBottom={'2px solid grey'}>
						Related Task
					</Typography>
				</Stack>
				{formValues.relatedTask && (
					<Stack direction={'row'} mt={2} width={'100%'}>
						<Box
							borderRadius={2}
							border={'1px solid #10182808'}
							padding={2}
							boxShadow={`0px 4px 6px -2px #10182808`}
							width={'100%'}
						>
							<TaskCard data={formValues.relatedTask} />
						</Box>
					</Stack>
				)}
				<Stack direction={'row'} mt={2}>
					<CustomButton
						btnText="Link to a parent task"
						variant="text"
						startIcon={<GrAdd />}
						onClick={toggleLinkToParentTaskModal}
					/>
				</Stack>
			</Stack>
			<LinkToOtherTaskModal
				isOpen={isOpenLinkToParentTaskModal}
				handleCloseModal={toggleLinkToParentTaskModal}
				getSelectedTask={(relatedTask) => {
					handleFormValueChange('relatedTask', relatedTask);
				}}
			/>
		</>
	);
};
