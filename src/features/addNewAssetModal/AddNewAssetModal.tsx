'use client';

import { useState } from 'react';
import { Modal } from 'components/Modal';

import { AddNewAssetForm } from './AddNewAssetForm';

type Props = {
    children: (handleOpenModal: () => void) => React.ReactNode;
    openOnLoad: boolean;
};

export function AddNewAssetModal({ children, openOnLoad }: Props): JSX.Element {
    const [openModal, setOpenModal] = useState<boolean>(openOnLoad);

    const handleCloseModal = (): void => {
        setOpenModal(false);
    };

    const handleOpenModal = (): void => {
        setOpenModal(true);
    };

    return (
        <>
            {children(handleOpenModal)}
            {openModal && (
                <Modal title="addNewAsset">
                    <AddNewAssetForm onSuccess={handleCloseModal} />
                </Modal>
            )}
        </>
    );
}
