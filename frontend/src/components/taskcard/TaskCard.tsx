import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { BiTask } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { IoChevronForward } from 'react-icons/io5';
import { formatDateToDisplay, stringAvatar, stringToColor } from '@/utils';
import { StatusIndicator } from './StatusIndicator';
import { ITaskFromAPI } from '@/types';
import Image from 'next/image';

interface Props {
	data: ITaskFromAPI;
	isShowStatusIndicator?: boolean;
}

export const TaskCard = ({ data, isShowStatusIndicator = true }: Props) => {
	const { title, status, creationDate, assignee } = data;

	return (
		<Stack justifyContent={'space-between'} direction={'row'} width={'98%'}>
			<Stack direction={'row'} gap={2} alignItems={'center'}>
				<Image
					src={'https://res.cloudinary.com/dhs3t6x02/image/upload/v1692277540/Icon_wbjpkd.svg'}
					width={64}
					height={64}
					alt="hel"
				/>
				<Stack direction={'column'}>
					<Typography variant="h6">{title}</Typography>
					<Stack direction={'row'} color={'#98A2B3'} fontWeight={'600'} alignItems={'center'} gap={0.5}>
						<Stack direction={'row'} gap={0.25} alignItems={'center'}>
							<Avatar
								{...stringAvatar(assignee?.name || '')}
								sx={{ width: 26, height: 26, bgcolor: stringToColor(assignee?.name || '') }}
								src={assignee?.avatar}
							/>
							<Typography fontWeight={'600'} variant="body2">
								{assignee?.name || 'Unassigned'}
							</Typography>
						</Stack>
						<BsDot />
						<Typography variant="body2" fontWeight={'500'}>
							{formatDateToDisplay(creationDate)}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			{isShowStatusIndicator && (
				<Stack direction={'row'} alignItems={'center'} gap={2}>
					<Divider orientation="vertical" variant="middle" />
					<StatusIndicator status={status} />
					<IoChevronForward
						style={{
							color: '#98A2B3',
						}}
					/>
				</Stack>
			)}
		</Stack>
	);
};
