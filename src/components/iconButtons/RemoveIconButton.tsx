'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { IconButton } from '@/components/iconButtons/IconButton';
import { RemoveIcon } from '@/components/icons/RemoveIcon';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function RemoveIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <RemoveIcon size={size} />
        </IconButton>
    );
}
