'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { IconButton } from '@/components/iconButtons/IconButton';
import { OpenInNewIcon } from '@/components/icons/OpenInNewIcon';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function OpenInNewIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <OpenInNewIcon size={size} />
        </IconButton>
    );
}
