'use client';

import { query, Query } from 'firebase/firestore';
import { HookOptions, NotificationItem } from 'config/types';

import { useRealTimeFetchCollection } from 'libs/hooks/useRealTimeFetchCollection';
import { getNotificationCollectionRef } from 'libs/firebaseApp';

type StateLogic = [NotificationItem[], boolean];

export const useFetchNotifications = (
    userId: string,
    op: HookOptions = {}
): StateLogic =>
    useRealTimeFetchCollection<NotificationItem>(
        query(getNotificationCollectionRef(userId)) as Query<NotificationItem>,
        'errorRetrievingNotifications',
        op
    );
