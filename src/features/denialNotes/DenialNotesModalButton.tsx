'use client';

import { RedButton } from '@/components/buttons/RedButton';

import { DenialNotesModal } from './DenialNotesModal';

type Props = {
    title: string;
    data?: string;
    disabled: boolean;
};

export function DenialNotesModalButton({
    title,
    data,
    disabled
}: Props): JSX.Element {
    return (
        <DenialNotesModal title={title} data={data}>
            {(open) => (
                <RedButton
                    textId="viewDenialNotes"
                    onClick={open}
                    disabled={disabled}
                    fullWidth
                    withBorder
                />
            )}
        </DenialNotesModal>
    );
}
