'use client';

import { getUserId } from '@/state/user/selectors';
import { HookOptions } from '@/config/types';
import { assetsActions } from '@/state/assets/assetsSlice';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';

type HookLogic = [() => Promise<void>, boolean];

export const useFetchMerchantAssets = (op: HookOptions = {}): HookLogic => {
    const userId = useAppSelector(getUserId);

    const dispatch = useAppDispatch();

    const action = async (): Promise<void> => {
        const assets = await DatabaseService.getMerchantAssets(userId);
        dispatch(assetsActions.setList(assets));
    };

    const [fetch, processing] = useAsyncAction<void, void>(action, {
        error: 'errorRetrievingAssets',
        ...op
    });

    return [fetch, processing];
};
