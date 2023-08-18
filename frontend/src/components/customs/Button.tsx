import { CustomButtonTypes } from '@/types';
import { Button, ButtonProps, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {
	btnText: string;
	btnType?: CustomButtonTypes;
	isLoading?: boolean;
}

export const CustomButton = ({ btnText, btnType, isLoading, style, ...rest }: Props) => {
	return (
		<Button
			variant={btnType === 'tertiary' ? 'outlined' : 'contained'}
			size="small"
			style={{
				...(btnType === 'primary'
					? {
							color: 'white',
							background: '#0F52BA',
					  }
					: btnType === 'secondary'
					? {
							color: '#475467',
							background: '#F0F2F7',
					  }
					: btnType === 'tertiary'
					? {
							color: '#475467',
							borderColor: '#DFE3EB',
					  }
					: {}),
				borderRadius: '6px',
				...style,
			}}
			{...rest}
		>
			{isLoading ? (
				<CircularProgress
					size={'16px'}
					style={{
						background: 'white',
					}}
				/>
			) : (
				<Typography textTransform={'none'}>{btnText}</Typography>
			)}
		</Button>
	);
};
