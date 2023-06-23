'use client';

import { assetsActions } from 'state/assets/assetsSlice';
import { HookOptions } from 'config/types';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { DatabaseService } from 'services/DatabaseService';

type StateLogic = [() => Promise<void>, boolean];

export const useFetchMarketplace = (op: HookOptions = {}): StateLogic => {
    const dispatch = useAppDispatch();

    const action = async (): Promise<void> => {
        const items = await DatabaseService.getAllMarketItems();
        dispatch(assetsActions.setList(items));
    };

    const [fetchAssets, processing] = useAsyncAction<void, void>(action, {
        error: 'errorFetchingMarketplaceItems',
        ...op
    });

    return [fetchAssets, processing];
};
