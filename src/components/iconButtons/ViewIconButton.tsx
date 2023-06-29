'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { ViewIcon } from '@/components/icons/ViewIcon';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function ViewIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <ViewIcon size={size} />
        </IconButton>
    );
}
