'use client';

import { assetsActions } from 'state/assets/assetsSlice';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { DatabaseService } from 'services/DatabaseService';
import { SelectFilterEntry, HookOptions } from 'config/types';

type Args = {
    filters: SelectFilterEntry[];
};

type StateLogic = [({ filters }: Args) => Promise<void>, boolean];

export const useFetchMarketplace = (op: HookOptions = {}): StateLogic => {
    const dispatch = useAppDispatch();

    const action = async ({ filters }: Args): Promise<void> => {
        // TODO: revert
        const items = await DatabaseService.getAllMarketItems(filters);
        dispatch(assetsActions.setList(items));
    };

    const [fetchAssets, processing] = useAsyncAction<Args, void>(action, {
        error: 'errorFetchingMarketplaceItems',
        ...op
    });

    return [fetchAssets, processing];
};
