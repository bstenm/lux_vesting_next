'use client';

import { useState } from 'react';

import { Modal } from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { ProtectedComponent } from '@/features/authButton/ProtectedComponent';

import { path } from '@/config/path';
import { AddNewAssetForm } from './AddNewAssetForm';

type Props = {
    children: (handleOpenModal: () => void) => React.ReactNode;
};

export function AddNewAssetModalButton({ children }: Props): JSX.Element {
    const router = useRouter();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleCloseModal = (): void => {
        setOpenModal(false);
    };

    const handleOpenModal = (): void => {
        setOpenModal(true);
    };

    const onSuccess = (): void => {
        handleCloseModal();
        router.push(path.merchantAssets);
    };

    return (
        <>
            {children(handleOpenModal)}
            {openModal && (
                <Modal onCancel={handleCloseModal}>
                    <ProtectedComponent>
                        <AddNewAssetForm onSuccess={onSuccess} />
                    </ProtectedComponent>
                </Modal>
            )}
        </>
    );
}
