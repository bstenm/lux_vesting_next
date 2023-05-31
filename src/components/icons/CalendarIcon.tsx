'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

type Props = {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function CalendarIcon({ size }: Props): JSX.Element {
    return (
        <CalendarMonthIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.light' }}
        />
    );
}
