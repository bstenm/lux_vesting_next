'use client';

import { useTheme } from '@mui/material';
import MuiBadge, { BadgeProps } from '@mui/material/Badge';

export function Badge(props: BadgeProps): JSX.Element {
    const theme = useTheme();

    const { color } = props;

    return (
        <MuiBadge
            sx={
                color === 'error'
                    ? {
                          '& .MuiBadge-badge': {
                              color: theme.palette.common.white,
                              bgcolor: theme.palette.error.light
                          }
                      }
                    : {}
            }
            {...props}
        />
    );
}
