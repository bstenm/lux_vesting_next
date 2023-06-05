'use client';

import { useState } from 'react';

import { RootState } from 'redux/store';
import { HookOptions } from 'config/types';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { DatabaseService } from 'services/DatabaseService';
import { assetsActions } from 'state/assets/assetsSlice';
import { getAssetMedias } from 'state/assets/selectors';
import { AssetMediaMetadataItem, MediaType } from 'config/types/asset';

type StateLogic = {
    files: AssetMediaMetadataItem[];
    processing: boolean;
    onSaveList: () => Promise<void>;
    onReorderList: (items: AssetMediaMetadataItem[]) => void;
};

export const useSortableMediaList = (
    assetId: string,
    mediaType: MediaType,
    onSuccess: () => void,
    op: HookOptions = {}
): StateLogic => {
    const dispatch = useAppDispatch();

    const files = useAppSelector((state: RootState) =>
        getAssetMedias(state, assetId, mediaType)
    );

    const [list, setList] = useState<AssetMediaMetadataItem[]>(files);

    const onReorderList = (items: AssetMediaMetadataItem[]): void => {
        setList(items);
    };

    const action = async (): Promise<void> => {
        const newMediaList: AssetMediaMetadataItem[] = files.map((file) => {
            const idx = list.findIndex((e) => e.id === file.id);
            return idx > -1 ? { ...file, priority: idx + 1 } : file;
        });
        await DatabaseService.updateAssetMedias(assetId, newMediaList);
        dispatch(
            assetsActions.updateData({
                id: assetId,
                data: { medias: newMediaList }
            })
        );
        onSuccess();
    };

    const [onSaveList, processing] = useAsyncAction<void, void>(action, {
        error: 'errorReorderingList',
        ...op
    });

    return { files, onSaveList, onReorderList, processing };
};
