'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { IconButton } from 'components/iconButtons/IconButton';
import { CommentIcon } from 'components/icons/CommentIcon';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function CommentIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <CommentIcon size={size} />
        </IconButton>
    );
}
