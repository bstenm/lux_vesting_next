'use client';

import MuiOpenInNewIcon from '@mui/icons-material/OpenInNew';
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

export function OpenInNewIcon({ size }: Props): JSX.Element {
    return (
        <MuiOpenInNewIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.main' }}
        />
    );
}
