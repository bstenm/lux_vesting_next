'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { HomeIcon } from '@/components/icons/HomeIcon';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function HomeIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <HomeIcon size={size} />
        </IconButton>
    );
}
