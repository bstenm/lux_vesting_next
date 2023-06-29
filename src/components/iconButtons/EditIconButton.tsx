'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { EditIcon } from '@/components/icons/EditIcon';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function EditIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <EditIcon size={size} />
        </IconButton>
    );
}
