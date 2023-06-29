'use client';

import { HookOptions } from '@/config/types';
import { assetsActions } from '@/state/assets/assetsSlice';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';

type StateLogic = [() => Promise<void>, boolean];

export const useAdminFetchAssets = (op: HookOptions = {}): StateLogic => {
    const dispatch = useAppDispatch();

    const action = async (): Promise<void> => {
        const assets = await DatabaseService.getAllAssets();
        dispatch(assetsActions.setList(assets));
    };

    const [fetchAssets, fetching] = useAsyncAction<void, void>(action, {
        error: 'errorRetrievingAssets',
        ...op
    });

    return [fetchAssets, fetching];
};
