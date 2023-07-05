import {
    AssetStatusType,
    AssetListingStatus,
    AssetAuthenticationStatus
} from '@/config/types/asset';
import { assetsActions } from '@/state/assets/assetsSlice';
import { DatabaseService } from '@/services/DatabaseService';
import { useSendNotifications } from '@/features/notifications/useSendNotifications';
import { HookOptions, NotificationType } from '@/config/types';

import { useAppDispatch } from './useAppDispatch';
import { useAsyncAction } from './useAsyncAction';

type AssetStatus = AssetListingStatus | AssetAuthenticationStatus;

type StateLogic = [
    (status: AssetStatus, notes?: string) => Promise<void>,
    boolean
];

type Args = {
    status: AssetStatus;
    notes?: string;
};

export const useUpdateAssetStatus = (
    assetId: string,
    merchantId: string,
    statusType: AssetStatusType,
    op: HookOptions = {}
): StateLogic => {
    const dispatch = useAppDispatch();

    const [sendNotifications] = useSendNotifications(assetId, {
        silent: true
    });

    const action = async ({ status, notes = '' }: Args): Promise<void> => {
        const data = { status, notes };
        const statusData = { [statusType]: data };
        await DatabaseService.updateAssetStatus(assetId, statusType, data);
        dispatch(assetsActions.updateData({ id: assetId, data: statusData }));
        // Notify the merchatn of the asset status change
        const to = [merchantId];
        const type: NotificationType = `${statusType}StatusChanged`;
        sendNotifications({ to, data: { type, value: status } });
    };

    const [updateStatus, processing] = useAsyncAction<Args, void>(action, {
        error: 'errorUpdatingAssetData',
        ...op
    });

    return [
        (status: AssetStatus, notes?: string) =>
            updateStatus({ status, notes }),
        processing
    ];
};
