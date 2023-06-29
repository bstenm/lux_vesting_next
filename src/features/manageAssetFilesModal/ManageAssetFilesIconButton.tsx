'use client';

import { useState } from 'react';

import { Modal } from '@/components/Modal';
import { RootState } from '@/redux/store';
import { MediaType } from '@/config/types/asset';
import { getAssetData } from '@/state/assets/selectors';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { DocsIconButton } from '@/components/iconButtons/DocsIconButton';
import { CameraIconButton } from '@/components/iconButtons/CameraIconButton';

import { ManageAssetFiles } from './ManageAssetFiles';

type Props = {
    assetId: string;
    mediaType: MediaType;
};

export function ManageAssetFilesIconButton({
    assetId,
    mediaType
}: Props): JSX.Element {
    const { name } = useAppSelector((state: RootState) =>
        getAssetData(state, assetId)
    );

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            {mediaType === 'picture' ? (
                <CameraIconButton title="pictures" onClick={handleOpen} />
            ) : (
                <DocsIconButton title="documents" onClick={handleOpen} />
            )}
            {open && (
                <Modal title={name}>
                    <ManageAssetFiles
                        assetId={assetId}
                        mediaType={mediaType}
                        handleClose={handleClose}
                    />
                </Modal>
            )}
        </>
    );
}
