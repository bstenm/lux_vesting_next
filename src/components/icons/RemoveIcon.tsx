'use client';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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

export function RemoveIcon({ size }: Props): JSX.Element {
    return (
        <HighlightOffIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.light' }}
        />
    );
}
