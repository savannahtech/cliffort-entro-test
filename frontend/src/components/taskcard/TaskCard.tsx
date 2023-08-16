import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Chip,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';
import { BiTask } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { BsDot } from 'react-icons/bs';
import CustomButton from '../customs/Button';
import { stringAvatar, stringToColor } from '@/utils';
import { StatusIndicator } from './StatusIndicator';
import { TaskCardDetailsTabs } from './TaskCardDetailsTabs';
import { GrAdd } from 'react-icons/gr';

export const TaskCard = () => {
	return (
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
			</AccordionSummary>
			<AccordionDetails>
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
			</AccordionDetails>
		</Accordion>
	);
};
