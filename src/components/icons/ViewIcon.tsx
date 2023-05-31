'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
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

export function ViewIcon({ size }: Props): JSX.Element {
    return (
        <VisibilityIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.light' }}
        />
    );
}
