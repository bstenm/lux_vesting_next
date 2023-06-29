'use client';

import { getUserId } from '@/state/user/selectors';
import { AssetItem } from '@/config/types/asset';
import { HookOptions } from '@/config/types';
import { assetsActions } from '@/state/assets/assetsSlice';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';

type StateLogic = [() => Promise<AssetItem[]>, boolean];

export const useFetchMerchantAssets = (op: HookOptions = {}): StateLogic => {
    const userId = useAppSelector(getUserId);

    const dispatch = useAppDispatch();

    const action = async (): Promise<AssetItem[]> => {
        const assets = await DatabaseService.getMerchantAssets(userId);
        dispatch(assetsActions.setList(assets));
        return assets;
    };

    const [fetch, processing] = useAsyncAction<void, AssetItem[]>(action, {
        error: 'errorRetrievingAssets',
        ...op
    });

    return [fetch, processing];
};
