'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { DocsIcon } from '@/components/icons/DocsIcon';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function DocsIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <DocsIcon size={size} />
        </IconButton>
    );
}
