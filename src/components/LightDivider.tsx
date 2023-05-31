'use client';

import Divider, { DividerProps } from '@mui/material/Divider';

type Props = DividerProps & {
    margin?: number;
};

export function LightDivider({ margin, sx, ...props }: Props): JSX.Element {
    return (
        <Divider
            sx={{
                my: props.orientation !== 'vertical' ? margin : 0,
                mx: props.orientation === 'vertical' ? margin : 0,
                bgcolor: 'primary.light',
                ...sx
            }}
            {...props}
        />
    );
}
