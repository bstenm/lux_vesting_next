'use client';

import DescriptionIcon from '@mui/icons-material/Description';
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

export function DocsIcon({ size }: Props): JSX.Element {
    return (
        <DescriptionIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.light' }}
        />
    );
}
