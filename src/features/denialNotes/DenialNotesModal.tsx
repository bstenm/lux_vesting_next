'use client';

import { DataPoint } from 'components/DataPoint';
import { ButtonWithModal } from 'components/ButtonWithModal';

type Props = {
    title: string;
    data?: string;
    children: (handleClose: () => void) => React.ReactNode;
};

export function DenialNotesModal({
    title,
    data,
    children
}: Props): JSX.Element {
    return (
        <ButtonWithModal showCloseButton title={title} button={children}>
            {(_) => <DataPoint data={data} showMissingMessage />}
        </ButtonWithModal>
    );
}
