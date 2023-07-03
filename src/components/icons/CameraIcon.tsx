'use client';

import LocalSeeIcon from '@mui/icons-material/LocalSee';
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

export function CameraIcon({ size }: Props): JSX.Element {
    return (
        <LocalSeeIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.main' }}
        />
    );
}
