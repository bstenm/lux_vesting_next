'use client';

import { HookOptions } from '@/config/types';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { DatabaseService } from '@/services/DatabaseService';

export type DeleteNotificationArgs = {
    id: string;
    uid: string;
};

type StateLogic = [(args: DeleteNotificationArgs) => void, boolean];

export const useDeleteNotification = (op: HookOptions = {}): StateLogic => {
    const deleteNotificationAction = async ({
        id,
        uid
    }: DeleteNotificationArgs): Promise<void> => {
        await DatabaseService.deleteNotification(id, uid);
    };

    const [deleteNotification, deleting] = useAsyncAction<
        DeleteNotificationArgs,
        void
    >(deleteNotificationAction, {
        error: 'errorDeletingNotifications',
        ...op
    });

    return [deleteNotification, deleting];
};
