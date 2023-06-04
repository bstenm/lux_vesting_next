'use client';

import { BidIcon } from 'components/icons/BidIcon';
import { IconButton } from 'components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?: number;
};

export function BidIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <BidIcon size={size} />
        </IconButton>
    );
}
