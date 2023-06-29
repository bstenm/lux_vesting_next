'use client';

import { RootState } from '@/redux/store';
import { HookOptions } from '@/config/types';
import { StorageService } from '@/services/StorageService';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { DatabaseService } from '@/services/DatabaseService';
import { assetsActions } from '@/state/assets/assetsSlice';
import { getAssetMedias } from '@/state/assets/selectors';
import { AssetMediaMetadataItem, MediaType } from '@/config/types/asset';

type RemoveParams = {
    id: string;
};

type StateLogic = {
    files: AssetMediaMetadataItem[];
    processing: boolean;
    onRemoveItem: ({ id }: RemoveParams) => void;
};

export const useRemoveAssetMediaItem = (
    assetId: string,
    mediaType: MediaType,
    op: HookOptions = {}
): StateLogic => {
    const dispatch = useAppDispatch();

    const files = useAppSelector((state: RootState) =>
        getAssetMedias(state, assetId, mediaType)
    );

    const action = async ({ id }: RemoveParams): Promise<void> => {
        const newList = files.filter((e) => e.id !== id);
        await DatabaseService.updateAssetMedias(assetId, newList);
        dispatch(
            assetsActions.updateData({
                id: assetId,
                data: { medias: newList }
            })
        );
        // We remove the file from the storage at the end so an
        // exception would not prevent the deletion from the database
        const media = files.find((e) => e.id === id);
        if (media) {
            await StorageService.removeMedia(media.uri);
        }
    };

    const [onRemoveItem, processing] = useAsyncAction<RemoveParams, void>(
        action,
        {
            error: 'errorRemovingItem',
            ...op
        }
    );

    return {
        files,
        processing,
        onRemoveItem
    };
};
