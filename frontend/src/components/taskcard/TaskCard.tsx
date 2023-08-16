import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { BiTask } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { stringAvatar, stringToColor } from '@/utils';
import { StatusIndicator } from './StatusIndicator';

export const TaskCard = () => {
	return (
		<Stack justifyContent={'space-between'} direction={'row'} width={'98%'}>
			<Stack direction={'row'} gap={2} alignItems={'center'}>
				<BiTask
					style={{
						width: 50,
						height: 50,
						color: '#98A2B3',
					}}
				/>
				<Stack direction={'column'}>
					<Typography variant="h6">Task Title</Typography>
					<Stack direction={'row'} color={'#98A2B3'} fontWeight={'600'} alignItems={'center'} gap={0.5}>
						<Stack direction={'row'} gap={0.25} alignItems={'center'}>
							<Avatar
								{...stringAvatar('Clifford Owusu')}
								sx={{ width: 26, height: 26, background: stringToColor('Clifford') }}
							/>
							<Typography variant="body2">Assignee Name</Typography>
						</Stack>

						<BsDot />
						<Typography variant="body2" fontWeight={'500'}>
							10 September,2023
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Stack direction={'row'} alignItems={'center'} gap={2}>
				<Divider orientation="vertical" variant="middle" />
				<StatusIndicator status="IN_PROGRESS" />
			</Stack>
		</Stack>
	);
};
