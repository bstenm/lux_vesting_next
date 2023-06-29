'use client';

import { useState } from 'react';

import { Modal } from '@/components/Modal';
import { AssetListingStatus } from '@/config/types/asset';

import { AdminAssetListingStatusButton } from './AdminAssetListingStatusButton';

type Props = {
    status?: AssetListingStatus;
    onViewListing: () => void;
};

export function ManageAdminListingStatusButton({
    status,
    onViewListing
}: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <AdminAssetListingStatusButton
                status={status}
                onViewListingData={onViewListing}
            />
            {open && <Modal onConfirm={handleClose}>The Purchase Data</Modal>}
        </>
    );
}
