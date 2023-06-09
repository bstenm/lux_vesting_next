import {
    Firestore,
    collection,
    getFirestore,
    DocumentData,
    WithFieldValue,
    SnapshotOptions,
    CollectionReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import pick from 'lodash/pick';
import { firebaseApp } from 'libs/firebaseApp';

import { Message, NotificationItem, AssetNotification } from 'config/types';

const db: Firestore = getFirestore(firebaseApp);

const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore(message: WithFieldValue<Message>): DocumentData {
        return message;
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Message {
        return pick(snapshot.data(options), [
            'to',
            'text',
            'from',
            'createdAt'
        ]);
    }
};

export const getMessageCollection = (
    assetId: string
): CollectionReference<Message> =>
    collection(db, 'assets', assetId, 'messages').withConverter(
        messageConverter
    );

const notificationConverter: FirestoreDataConverter<NotificationItem> = {
    toFirestore(message: WithFieldValue<AssetNotification>): DocumentData {
        return message;
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): NotificationItem {
        const data = pick(snapshot.data(options), [
            'link',
            'type',
            'from',
            'value',
            'assetId',
            'createdAt',
            'assetName'
        ]);
        return { id: snapshot.id, ...data };
    }
};

export const getNotificationCollection = (
    userId: string
): CollectionReference<NotificationItem> =>
    collection(db, 'users', userId, 'notifications').withConverter(
        notificationConverter
    );
