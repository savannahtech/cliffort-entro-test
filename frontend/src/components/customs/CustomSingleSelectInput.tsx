import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CustomSelectInputProps } from '@/types';

interface Props extends CustomSelectInputProps {
	options: { label: string; value: string }[];
}

export const CustomSingleSelectInput = ({ options, label, id, value, getValue, ...rest }: Props) => {
	const [selectedValue, setSelectedValue] = React.useState(value || '');

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedValue(event.target.value);
		getValue(event.target.value);
	};

	return (
		<div>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
				<Select
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					value={selectedValue}
					onChange={handleChange as any}
					label={label}
					{...rest}
				>
					{options.map(({ value, label }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
