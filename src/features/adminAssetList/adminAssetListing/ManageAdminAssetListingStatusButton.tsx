'use client';

import { useState } from 'react';

import { Modal } from 'components/Modal';
import { AssetItem } from 'config/types/asset';

import { AdminAssetListingStatusButton } from './AdminAssetListingStatusButton';

type Props = {
    data: AssetItem;
    onViewListing: () => void;
};

export function ManageAdminListingStatusButton({
    data,
    onViewListing
}: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <AdminAssetListingStatusButton
                status={data.listing.status}
                onViewListingData={onViewListing}
                onViewPuchaseData={handleOpen}
            />
            {open && <Modal onConfirm={handleClose}>The Purchase Data</Modal>}
        </>
    );
}
