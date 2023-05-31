'use client';

import sortBy from 'lodash/sortBy';
import { Query, collection, query, where } from 'firebase/firestore';

import { db } from 'libs/firebaseApp';
import { MessageItem } from 'config/types';
import { useRealTimeFetchCollection } from 'libs/hooks/useRealTimeFetchCollection';

type StateLogic = [MessageItem[] | undefined, boolean];

export const useFetchChat = (
    to: string,
    from: string,
    assetId: string
): StateLogic => {
    const errMessage = 'errorRetrievingMessages';

    const messageRef = collection(db, 'assets', assetId, 'messages');

    const q1 = query(
        messageRef,
        where('to', '==', to),
        where('from', '==', from)
    ) as Query<MessageItem>;

    const q2 = query(
        messageRef,
        where('to', '==', from),
        where('from', '==', to)
    ) as Query<MessageItem>;

    const [m1, fetching1] = useRealTimeFetchCollection<MessageItem>(
        q1,
        errMessage
    );

    const [m2, fetching2] = useRealTimeFetchCollection<MessageItem>(
        q2,
        errMessage
    );

    const messages = sortBy((m1 || []).concat(m2 || []), 'createdAt');

    return [messages, fetching1 || fetching2];
};
