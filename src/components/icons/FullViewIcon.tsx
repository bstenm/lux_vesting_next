'use client';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
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

export function FullViewIcon({ size }: Props): JSX.Element {
    return (
        <FullscreenIcon
            fontSize={size ?? 'medium'}
            sx={{ color: 'primary.light' }}
        />
    );
}
