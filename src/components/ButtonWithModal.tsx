'use client';

import { useState } from 'react';

import { Modal } from 'components/Modal';

type Props = React.ComponentProps<typeof Modal> & {
    button: (handleOpen: () => void) => React.ReactNode;
    children: (handleClose: () => void) => React.ReactNode;
    showCloseButton?: boolean;
    opened?: boolean;
};

export function ButtonWithModal({
    button,
    opened = false,
    children,
    confirmBtnText,
    showCloseButton,
    ...rest
}: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(opened);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            {button(handleOpen)}
            {open && (
                <Modal
                    onCancel={handleClose}
                    onConfirm={showCloseButton ? handleClose : undefined}
                    confirmBtnText={confirmBtnText ?? 'close'}
                    {...rest}>
                    {children(handleClose)}
                </Modal>
            )}
        </>
    );
}
