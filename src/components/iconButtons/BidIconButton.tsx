'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { BidIcon } from 'components/icons/BidIcon';
import { IconButton } from 'components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function BidIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <BidIcon size={size} />
        </IconButton>
    );
}
