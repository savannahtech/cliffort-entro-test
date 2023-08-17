import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TaskLists } from '../taskLists';
import { IAssignee, TaskListType } from '@/types';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface TaskCardDetailsTabsProps {
	relatedTasks?: TaskListType;
	watchers?: IAssignee[];
}

export const TaskCardDetailsTabs = ({ relatedTasks }: TaskCardDetailsTabsProps) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Related tasks" {...a11yProps(0)} />
					<Tab label="Watchers" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				{relatedTasks && <TaskLists taskLists={relatedTasks} />}
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				To be implemented
			</CustomTabPanel>
		</Box>
	);
};

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
