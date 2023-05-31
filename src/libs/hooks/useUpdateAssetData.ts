import { AssetItem } from 'config/types/asset';
import { HookOptions } from 'config/types';
import { assetsActions } from 'state/assets/assetsSlice';
import { DatabaseService } from 'services/DatabaseService';

import { useAsyncAction } from './useAsyncAction';
import { useAppDispatch } from './useAppDispatch';

type StateLogic = [(values: Partial<AssetItem>) => Promise<void>, boolean];

export const useUpdateAssetData = (
    id: string,
    op: HookOptions = {}
): StateLogic => {
    const dispatch = useAppDispatch();

    const action = async (data: Partial<AssetItem>): Promise<void> => {
        await DatabaseService.updateAssetData(id as string, data);
        dispatch(assetsActions.updateData({ id, data }));
    };

    const [updateAssetData, processing] = useAsyncAction<
        Partial<AssetItem>,
        void
    >(action, { error: 'errorUpdatingAssetData', ...op });

    return [updateAssetData, processing];
};
