'use client';

import { Modal } from '@/components/Modal';
import { ProtectedComponent } from '@/features/authButton/ProtectedComponent';

import { AddNewAssetForm } from './AddNewAssetForm';

type Props = {
    closeModal: () => void;
};

export function AddNewAssetModal({ closeModal }: Props): JSX.Element {
    return (
        <Modal title="addNewAsset" onCancel={closeModal}>
            <ProtectedComponent>
                <AddNewAssetForm onSuccess={closeModal} />
            </ProtectedComponent>
        </Modal>
    );
}
