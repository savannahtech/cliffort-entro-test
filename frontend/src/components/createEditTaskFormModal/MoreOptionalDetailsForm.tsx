import { Stack, Divider, Typography, Box, TextField } from '@mui/material';
import React from 'react';
import CustomButton from '../customs/Button';
import { GrAdd } from 'react-icons/gr';
import { ICreateEditTaskFormValues } from '@/types';

interface Props {
	handleFormValueChange: (fieldName: keyof ICreateEditTaskFormValues, value: any) => void;
	formValues: ICreateEditTaskFormValues;
}

export const MoreOptionalDetailsForm = ({ handleFormValueChange, formValues }: Props) => {
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
						Related Tasks
					</Typography>
				</Stack>
				<Stack direction={'row'} mt={2}>
					<CustomButton btnText="Link to other tabs" variant="text" startIcon={<GrAdd />} />
				</Stack>
			</Stack>
		</>
	);
};
