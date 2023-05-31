'use client';

import { Modal } from 'components/Modal';
import { RedButton } from 'components/buttons/RedButton';
import { AssetStatusType } from 'config/types/asset';
import { ButtonWithModal } from 'components/ButtonWithModal';

import { DenialNotesForm } from './DenialNotesForm';

type Props = React.ComponentProps<typeof RedButton> & {
    textId?: string;
    assetId: string;
    onDone: (notes?: string) => void;
    statusType: AssetStatusType;
};

export function DenyButton({
    textId,
    assetId,
    onDone,
    statusType,
    ...rest
}: Props): JSX.Element {
    return (
        <ButtonWithModal
            button={(handleOpen) => (
                <RedButton
                    textId={textId ?? 'deny'}
                    onClick={handleOpen}
                    withBorder
                    fullWidth
                    {...rest}
                />
            )}>
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
