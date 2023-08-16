import { CustomButtonTypes } from '@/types';
import { Button, ButtonProps, Typography } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {
	btnText: string;
	btnType?: CustomButtonTypes;
}

const CustomButton = ({ btnText, btnType, ...rest }: Props) => {
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
					: {
							color: '#475467',
					  }),
				paddingRight: '25px',
			}}
			{...rest}
		>
			<Typography textTransform={'none'}>{btnText}</Typography>
		</Button>
	);
};

export default CustomButton;
