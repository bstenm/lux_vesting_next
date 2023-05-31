'use client';

import { Modal } from 'components/Modal';
import { BigMutedMessage } from 'components/typography/BigMutedMessage';

type Props = React.ComponentProps<typeof Modal> & {
    textId: string;
};

export function ModalForbidden({ textId, ...props }: Props): JSX.Element {
    return (
        <Modal danger {...props}>
            <BigMutedMessage sx={{ mb: 2 }} textId={textId} uppercased />
        </Modal>
    );
}
