'use client';

import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { DatabaseService } from 'services/DatabaseService';
import { HookOptions, NotificationData } from 'config/types';

export type SendNotificationArgs = {
    to: string[];
    data: NotificationData;
};

type StateLogic = [(data: SendNotificationArgs) => void, boolean];

export const useSendNotifications = (op: HookOptions = {}): StateLogic =>
    useAsyncAction<SendNotificationArgs, void>(
        async ({ to, data }: SendNotificationArgs) =>
            DatabaseService.addNotificationToUsers(to, data),
        {
            error: 'errorSendingNotification',
            ...op
        }
    );
