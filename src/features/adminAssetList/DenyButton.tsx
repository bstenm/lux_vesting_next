'use client';

import { Modal } from '@/components/Modal';
import { RedButton } from '@/components/buttons/RedButton';
import { ButtonWithModal } from '@/components/ButtonWithModal';

import { useCallback } from 'react';
import { DenialNotesForm } from './DenialNotesForm';

type Props = React.ComponentProps<typeof RedButton> & {
    onDone: (notes?: string) => void;
};

export function DenyButton({ textId, onDone, ...rest }: Props): JSX.Element {
    const OpenModalButton = useCallback(
        (handleOpen: () => void) => (
            <RedButton
                textId={textId ?? 'deny'}
                onClick={handleOpen}
                withBorder
                fullWidth
                {...rest}
            />
        ),
        [rest, textId]
    );

    return (
        <ButtonWithModal button={OpenModalButton}>
            {(handleClose) => (
                <Modal>
                    <DenialNotesForm
                        onCancel={handleClose}
                        onSave={(notes?: string) => {
                            onDone(notes);
                            handleClose();
                        }}
                    />
                </Modal>
            )}
        </ButtonWithModal>
    );
}
