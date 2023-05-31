'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { IconButton } from 'components/iconButtons/IconButton';
import { FullViewIcon } from 'components/icons/FullViewIcon';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function FullViewIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <FullViewIcon size={size} />
        </IconButton>
    );
}
