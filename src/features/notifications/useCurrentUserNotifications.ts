'use client';

import { getUserId } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { HookOptions, NotificationData, NotificationItem } from 'config/types';

import { useFetchNotifications } from './useFetchNotifications';
import { useDeleteNotification } from './useDeleteNotification';
import { useSendNotifications } from './useSendNotifications';

type StateLogic = {
    sending: boolean;
    deleting: boolean;
    fetching: boolean;
    userNotifications: NotificationItem[];
    sendUserNotification: (data: NotificationData) => void;
    deleteUserNotification: (id: string) => void;
};

export const useCurrentUserNotifications = (
    op: HookOptions = {}
): StateLogic => {
    const uid = useAppSelector(getUserId);

    const [items, fetching] = useFetchNotifications(uid, op);

    const [sendNotifications, sending] = useSendNotifications(op);

    const [deleteNotification, deleting] = useDeleteNotification(op);

    return {
        sending,
        deleting,
        fetching,
        userNotifications: items || [],
        sendUserNotification: (data) => sendNotifications({ data, to: [uid] }),
        deleteUserNotification: (id) => deleteNotification({ id, uid })
    };
};
