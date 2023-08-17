import { ICreateEditTaskFormValues } from '@/types';
import { Stack, TextField, Autocomplete } from '@mui/material';
import React from 'react';
import { MdAddTask } from 'react-icons/md';

interface Props {
	handleFormValueChange: (fieldName: keyof ICreateEditTaskFormValues, value: any) => void;
	formValues: ICreateEditTaskFormValues;
}

export const InitialForm = ({ handleFormValueChange, formValues }: Props) => {
	return (
		<Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
			<Stack direction={'row'} gap={2} alignItems={'center'} width={'60%'}>
				<MdAddTask
					style={{
						width: 50,
						height: 50,
						color: '#98A2B3',
					}}
				/>
				<TextField
					id="task-title"
					label="Task Title"
					variant="standard"
					fullWidth
					name="title"
					onChange={(e) => {
						handleFormValueChange('title', e.target.value);
					}}
				/>
			</Stack>
			<Autocomplete
				disablePortal
				id="assignee"
				options={[{ label: 'Hello', id: 1 }]}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Assignee" variant="standard" />}
				onChange={(_e, newValue) => {
					handleFormValueChange('assigneeName', newValue?.label);
				}}
			/>
		</Stack>
	);
};
