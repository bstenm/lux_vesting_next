'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { IconButton } from '@/components/iconButtons/IconButton';
import { CameraIcon } from '@/components/icons/CameraIcon';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function CameraIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <CameraIcon size={size} />
        </IconButton>
    );
}
