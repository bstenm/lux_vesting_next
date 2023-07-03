'use client';

import MuiHomeIcon from '@mui/icons-material/Home';
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

export function HomeIcon({ size }: Props): JSX.Element {
    return (
        <MuiHomeIcon
            fontSize={size ?? 'medium'}
            sx={{ color: 'primary.main' }}
        />
    );
}
