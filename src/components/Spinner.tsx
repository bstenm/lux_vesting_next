'use client';

import CircularProgress, {
    circularProgressClasses
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    size?: number;
};

export function Spinner({ size }: Props): JSX.Element {
    return (
        <Box
            sx={{
                m: 'auto',
                width: size ?? 17,
                display: 'flex',
                position: 'relative',
                alignItems: 'center'
            }}>
            <CircularProgress
                variant="determinate"
                sx={{ color: 'common.white' }}
                size={size ?? 17}
                thickness={6}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: 'primary.dark',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round'
                    }
                }}
                size={size ?? 17}
                thickness={6}
            />
        </Box>
    );
}
