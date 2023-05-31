'use client';

import { DataPoint } from 'components/DataPoint';
import { ButtonWithModal } from 'components/ButtonWithModal';

type Props = Omit<React.ComponentProps<typeof ButtonWithModal>, 'button'> & {
    title: string;
    notes?: string;
    children: (handleClose: () => void) => React.ReactNode;
};

export function RequestDenialModal({
    title,
    notes,
    children,
    ...props
}: Props): JSX.Element {
    return (
        <ButtonWithModal
            showCloseButton
            title={title}
            button={children}
            {...props}>
            {(_) => <DataPoint showMissingMessage data={notes} />}
        </ButtonWithModal>
    );
}
