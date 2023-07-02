'use client';

import { query, Query } from 'firebase/firestore';
import { HookOptions, NotificationItem } from '@/config/types';

import { useRealTimeFetchCollection } from '@/libs/hooks/useRealTimeFetchCollection';
import { getNotificationCollectionRef } from '@/libs/firebaseApp';

type HookLogic = [NotificationItem[], boolean];

export const useFetchNotifications = (
    userId: string,
    op: HookOptions = {}
): HookLogic =>
    useRealTimeFetchCollection<NotificationItem>(
        query(getNotificationCollectionRef(userId)) as Query<NotificationItem>,
        'errorRetrievingNotifications',
        op
    );
