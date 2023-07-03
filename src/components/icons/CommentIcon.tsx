'use client';

import MuiCommentIcon from '@mui/icons-material/Comment';
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

export function CommentIcon({ size }: Props): JSX.Element {
    return (
        <MuiCommentIcon
            fontSize={size ?? 'small'}
            sx={{ color: 'primary.main' }}
        />
    );
}
