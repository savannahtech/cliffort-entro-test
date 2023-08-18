import { Queries, allQueryOptions } from '@/api/queries';
import { IAssignee, ICreateEditTaskFormValues } from '@/types';
import { Stack, TextField, Autocomplete } from '@mui/material';
import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { CustomLoader } from '../customs';
import { toast } from 'react-toastify';
import { FAILED_TO_FETCH_MESSAGE } from '@/constants';
import Image from 'next/image';

interface Props {
	handleFormValueChange: (fieldName: keyof ICreateEditTaskFormValues, value: any) => void;
	formValues: ICreateEditTaskFormValues;
}

export const InitialForm = ({ handleFormValueChange, formValues }: Props) => {
	const {
		data: allUsers,
		error: usersFetchingError,
		isLoading: isLoadingUsers,
	} = useQuery<IAssignee[], AxiosError>('users', Queries.getAllUsers, allQueryOptions);

	if (usersFetchingError) {
		toast.error(usersFetchingError.message || FAILED_TO_FETCH_MESSAGE);
	}

	return (
		<>
			<Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
				<Stack direction={'row'} gap={2} alignItems={'center'} width={'60%'}>
					<Image
						src={'https://res.cloudinary.com/dhs3t6x02/image/upload/v1692318969/Secret-Icon_1_li93dw.svg'}
						width={64}
						height={64}
						alt="task-icon"
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
						value={formValues.title}
					/>
				</Stack>
				<Autocomplete
					disablePortal
					id="assignee"
					options={
						allUsers?.map((item) => ({
							label: item.name,
							id: item.id,
						})) || []
					}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Assignee" variant="standard" />}
					onChange={(_e, newValue) => {
						handleFormValueChange('assigneeId', newValue?.id);
					}}
				/>
			</Stack>
			<Stack mt={2}>
				<CustomLoader loading={isLoadingUsers} height={'20%'} text="Loading Assingees Data..." width={'100%'} />
			</Stack>
		</>
	);
};
