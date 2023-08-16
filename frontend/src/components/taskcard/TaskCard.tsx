import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { BiArrowFromLeft, BiTask } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { BsDot } from 'react-icons/bs';
import CustomButton from '../customs/Button';
import { stringAvatar, stringToColor } from '@/utils';

export const TaskCard = () => {
	return (
		// <Box borderRadius={1} border={'1px solid #333'} padding={2}>
		<Accordion>
			<AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<IoIosArrowDown />}>
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
							<Stack direction={'row'} color={'#98A2B3'} fontWeight={'600'} alignItems={'center'}>
								<Avatar
									{...stringAvatar('Clifford Owusu')}
									sx={{ width: 24, height: 24, background: stringToColor('Clifford') }}
								/>
								<Typography variant="caption">Assign</Typography>
								<BsDot />

								<Typography variant="caption">Assign</Typography>
								<Typography variant="caption">Assign</Typography>
							</Stack>
						</Stack>
					</Stack>
					<Stack direction={'row'} alignItems={'center'} gap={2}>
						<Divider orientation="vertical" variant="middle" />
						<CustomButton btnType="tertiary" btnText="Todo" />
					</Stack>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<div>Heklllo Details</div>
			</AccordionDetails>
		</Accordion>
	);
};
