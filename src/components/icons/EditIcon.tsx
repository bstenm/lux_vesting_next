'use client';

import EditMuiIcon from '@mui/icons-material/Edit';
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

export function EditIcon({ size }: Props): JSX.Element {
    return (
        <EditMuiIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.main' }}
        />
    );
}
