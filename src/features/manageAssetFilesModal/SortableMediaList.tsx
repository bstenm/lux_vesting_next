'use client';

import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';

import { Row } from 'components/Row';
import { Button } from 'components/buttons/Button';
import { SortableList } from 'features/sortableList/SortableList';
import { DarkButton } from 'components/buttons/DarkButton';
import { MediaType, AssetMediaMetadataItem } from 'config/types/asset';

import { SortableMediaItem } from './SortableMediaItem';
import { useSortableMediaList } from './useSortableMediaList';

type Props = {
    assetId: string;
    onClose: () => void;
    mediaType: MediaType;
};

export function SortableMediaList({
    assetId,
    onClose,
    mediaType
}: Props): JSX.Element {
    const { files, onSaveList, onReorderList, processing } =
        useSortableMediaList(assetId, mediaType, onClose);

    return (
        <>
            <Box sx={{ mt: 4 }}>
                <SortableList<AssetMediaMetadataItem>
                    list={files}
                    rowHeight={130}
                    boxesPerRow={4}
                    onReorderList={onReorderList}>
                    {(item) => <SortableMediaItem data={item} />}
                </SortableList>
            </Box>
            <Row justifyContent="space-between">
                <Button
                    sx={{ color: 'primary.light' }}
                    textId="cancel"
                    variant="outlined"
                    onClick={onClose}
                    disabled={processing}
                />
                <DarkButton
                    textId="save"
                    onClick={onSaveList}
                    endIcon={<SaveIcon />}
                    loading={processing}
                />
            </Row>
        </>
    );
}
