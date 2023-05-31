import {
    AssetListingStatus,
    AssetAuthenticationStatusDetails,
    AssetAuthenticationStatus,
    AssetListingStatusDetails
} from 'config/types/asset';
import { useUpdateAssetData } from 'libs/hooks/useUpdateAssetData';
import { useSendNotifications } from 'features/notifications/useSendNotifications';
import { HookOptions, NotificationType } from 'config/types';

type AssetStatus = AssetListingStatus | AssetAuthenticationStatus;

type StateLogic = [
    (value: AssetStatus, notes?: string) => Promise<void>,
    boolean
];

type AssetStatusDetails =
    | AssetAuthenticationStatusDetails
    | AssetListingStatusDetails;

export type StatusType = 'listing' | 'authentication';

export const useUpdateAssetStatus = (
    assetId: string,
    merchantId: string,
    statusType: StatusType,
    op: HookOptions = {}
): StateLogic => {
    const [updateAssetData, updating] = useUpdateAssetData(assetId, op);

    const [sendNotifications] = useSendNotifications({
        silent: true
    });

    const updateStatus = async (
        status: AssetStatus,
        notes = ''
    ): Promise<void> => {
        const updatedAt = Date.now();
        const details: AssetStatusDetails = { status, updatedAt, notes };
        await updateAssetData({ [statusType]: details });
        const type: NotificationType = `${statusType}StatusChanged`;
        sendNotifications({
            to: [merchantId],
            data: { type, assetId, value: status }
        });
    };

    return [updateStatus, updating];
};
