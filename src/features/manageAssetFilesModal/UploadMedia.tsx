'use client';

import Box from '@mui/material/Box';

import { Row } from '@/components/Row';
import { MediaType } from '@/config/types/asset';
import { DarkButton } from '@/components/buttons/DarkButton';
import { DropFileArea } from '@/features/dropFileArea/DropFileArea';
import { BigMutedMessage } from '@/components/typography/BigMutedMessage';

import { ReorderButton } from './ReorderButton';
import { UploadedMediaItem } from './UploadedMediaItem';
import { useRemoveAssetMediaItem } from './useRemoveAssetMediaItem';

type Props = {
    assetId: string;
    mediaType: MediaType;
    handleClose: () => void;
    toSortableList: () => void;
};

export function UploadMedia({
    assetId,
    mediaType,
    handleClose,
    toSortableList
}: Props): JSX.Element {
    const { files, processing, onRemoveItem } = useRemoveAssetMediaItem(
        assetId,
        mediaType
    );

    const len = files?.length;

    return (
        <>
            <Row
                sx={{
                    my: 2,
                    flexWrap: 'wrap',
                    gap: 5
                }}>
                <DropFileArea assetId={assetId} mediaType={mediaType} />
                {!files.length ? (
                    <BigMutedMessage
                        textId={
                            mediaType === 'picture'
                                ? 'uploadPictures'
                                : 'uploadDocuments'
                        }
                    />
                ) : (
                    files.map((media) => (
                        <UploadedMediaItem
                            key={media.id}
                            data={media}
                            onRemove={onRemoveItem}
                        />
                    ))
                )}
            </Row>
            <Box>
                <Row justifyContent={len > 1 ? 'space-between' : 'flex-end'}>
                    {len > 1 && (
                        <ReorderButton
                            onClick={toSortableList}
                            disabled={processing}
                        />
                    )}
                    <DarkButton
                        textId="done"
                        onClick={handleClose}
                        loading={processing}
                    />
                </Row>
            </Box>
        </>
    );
}
