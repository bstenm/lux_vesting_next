'use client';

import { AssetMedia } from '@/config/types/asset';
import { HookOptions } from '@/config/types';
import { assetsActions } from '@/state/assets/assetsSlice';
import { StorageService } from '@/services/StorageService';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';

type HookLogic = [(data: AssetMedia) => Promise<void>, boolean];

export const useAddMediaToAsset = (
    assetId: string,
    op: HookOptions = {}
): HookLogic => {
    const dispatch = useAppDispatch();

    const action = async (data: AssetMedia): Promise<void> => {
        const { file, ...rest } = data;
        // Save file to storage and get url pointing to it
        const uri = await StorageService.uploadMedia(file);
        // We save the storage uri and media type as an array as part of the asset data
        const medias = await DatabaseService.addMediasToAsset(assetId, [
            { ...rest, uri }
        ]);
        dispatch(assetsActions.addMediasToAsset({ assetId, medias }));
    };

    const [addNewMedia, processing] = useAsyncAction<AssetMedia, void>(action, {
        error: 'errorAddingDocument',
        ...op
    });

    return [addNewMedia, processing];
};
