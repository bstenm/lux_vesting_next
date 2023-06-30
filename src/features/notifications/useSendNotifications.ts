'use client';

import { RootState } from '@/redux/store';
import { getAssetData } from '@/state/assets/selectors';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { DatabaseService } from '@/services/DatabaseService';
import { HookOptions, NotificationData } from '@/config/types';

import { useSendEmail } from './useSendEmail';

export type Args = {
    to: string[];
    data: NotificationData;
    method?: { push?: boolean; email?: boolean };
};

type HookLogic = [(data: Args) => void, boolean];

export const useSendNotifications = (
    assetId: string,
    op: HookOptions = {}
): HookLogic => {
    const [sendEmail] = useSendEmail();

    const { name: assetName } = useAppSelector((state: RootState) =>
        getAssetData(state, assetId)
    );

    const action = async ({
        to,
        data,
        method: { push = true, email = true } = {}
    }: Args): Promise<void> => {
        if (push) {
            const notification = { ...data, assetId, assetName };
            DatabaseService.addNotificationToUsers(to, notification);
        }
        if (email) {
            sendEmail({
                to: 'bstenm@hotmail.com',
                template: 'newListing'
            });
        }
    };

    return useAsyncAction<Args, void>(action, {
        error: 'errorSendingNotification',
        ...op
    });
};
