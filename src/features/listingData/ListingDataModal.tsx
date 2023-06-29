'use client';

import { ButtonWithModal } from '@/components/ButtonWithModal';

import { ListingData } from './ListingData';

type Props = React.ComponentProps<typeof ListingData> & {
    title: string;
    children: (handleClose: () => void) => React.ReactNode;
    opened?: boolean;
};

export function ListingDataModal({
    title,
    opened,
    children,
    ...rest
}: Props): JSX.Element {
    return (
        <ButtonWithModal
            fitContent
            showCloseButton
            title={title}
            button={children}
            opened={opened}>
            {() => <ListingData {...rest} />}
        </ButtonWithModal>
    );
}
