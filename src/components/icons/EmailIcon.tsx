'use client';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
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

export function EmailIcon({ size }: Props): JSX.Element {
    return (
        <AlternateEmailIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.main' }}
        />
    );
}
