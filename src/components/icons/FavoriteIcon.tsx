'use client';

import MuiFavoriteIcon from '@mui/icons-material/Favorite';
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

export function FavoriteIcon({ size }: Props): JSX.Element {
    return (
        <MuiFavoriteIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.light' }}
        />
    );
}
