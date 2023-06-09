'use client';

import { getAssetData } from 'state/assets/selectors';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { DatabaseService } from 'services/DatabaseService';
import { HookOptions, NotificationData } from 'config/types';
import { RootState } from 'redux/store';

export type SendNotificationArgs = {
    to: string[];
    data: NotificationData;
};

type StateLogic = [(data: SendNotificationArgs) => void, boolean];

export const useSendNotifications = (
    assetId: string,
    op: HookOptions = {}
): StateLogic => {
    const { name: assetName } = useAppSelector((state: RootState) =>
        getAssetData(state, assetId)
    );

    return useAsyncAction<SendNotificationArgs, void>(
        async ({ to, data }: SendNotificationArgs) => {
            const notification = { ...data, assetId, assetName };
            DatabaseService.addNotificationToUsers(to, notification);
        },
        {
            error: 'errorSendingNotification',
            ...op
        }
    );
};
