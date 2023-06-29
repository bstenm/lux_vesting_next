'use client';

import { useState } from 'react';

import { MediaType } from '@/config/types/asset';

import { UploadMedia } from './UploadMedia';
import { SortableMediaList } from './SortableMediaList';

type Props = {
    assetId: string;
    mediaType: MediaType;
    handleClose: () => void;
};

export function ManageAssetFiles({
    assetId,
    mediaType,
    handleClose
}: Props): JSX.Element {
    const [sortable, setSortable] = useState<boolean>(false);

    const toggleSortable = (): void => {
        setSortable(!sortable);
    };

    if (sortable)
        return (
            <SortableMediaList
                assetId={assetId}
                onClose={toggleSortable}
                mediaType={mediaType}
            />
        );

    return (
        <UploadMedia
            assetId={assetId}
            mediaType={mediaType}
            handleClose={handleClose}
            toSortableList={toggleSortable}
        />
    );
}
