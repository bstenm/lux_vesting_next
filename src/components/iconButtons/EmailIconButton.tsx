'use client';

import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { EmailIcon } from 'components/icons/EmailIcon';
import { IconButton } from 'components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function EmailIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <EmailIcon size={size} />
        </IconButton>
    );
}
