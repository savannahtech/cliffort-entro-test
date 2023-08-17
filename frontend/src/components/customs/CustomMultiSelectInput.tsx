import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { getValue } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

interface Props extends Partial<SelectProps> {
	options: string[];
	label: string;
	getValue: (value: string | string[]) => void;
}

export const CustomMultiSelectInput = ({ options, label, id, getValue, ...rest }: Props) => {
	const theme = useTheme();
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
		const {
			target: { value },
		} = event;
		setSelectedValues(typeof value === 'string' ? value.split(',') : value);
		getValue(value);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-name-label">{label}</InputLabel>
				<Select
					labelId="demo-multiple-name-label"
					id={id}
					multiple
					value={selectedValues}
					onChange={handleChange as any}
					input={<OutlinedInput label={label} />}
					MenuProps={MenuProps}
					{...rest}
				>
					{options.map((option) => (
						<MenuItem key={option} value={option} style={getStyles(option, selectedValues, theme)}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
