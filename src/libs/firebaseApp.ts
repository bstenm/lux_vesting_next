import {
    doc,
    Firestore,
    collection,
    getFirestore,
    CollectionReference,
    DocumentReference
} from 'firebase/firestore';

import { FirebaseApp, initializeApp } from 'firebase/app';

import { AssetItem } from 'config/types/asset';
import { firebaseConfig } from 'libs/firebaseConfig';

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(firebaseApp);

const bidCollection = 'bids';

const userCollection = 'users';

const assetCollection = 'assets';

const messageCollection = 'messages';

const notificationCollection = 'notifications';

export const userCollectionRef = collection(db, userCollection);

export const assetCollectionRef = collection(db, assetCollection);

export const getUserDocumentRef = (id: string): DocumentReference =>
    doc(db, userCollection, id);

export const getAssetDocumentRef = (id: string): DocumentReference =>
    doc(db, assetCollection, id);

export const getBidDocumentRef = (
    assetId: string,
    itemId: string
): DocumentReference =>
    doc(db, assetCollection, assetId, bidCollection, itemId);

export const getMessageDocumentRef = (
    assetId: string,
    itemId: string
): DocumentReference =>
    doc(db, assetCollection, assetId, messageCollection, itemId);

export const getUserNotificationDocumentRef = (
    uid: string,
    itemId: string
): DocumentReference =>
    doc(db, userCollection, uid, notificationCollection, itemId);

export const getAssetCollectionRef = (id: string): CollectionReference =>
    collection(db, assetCollection, id) as CollectionReference<AssetItem>;

export const getBidCollectionRef = (assetId: string): CollectionReference =>
    collection(db, assetCollection, assetId, bidCollection);

export const getMessageCollectionRef = (assetId: string): CollectionReference =>
    collection(db, assetCollection, assetId, messageCollection);

export const getNotificationCollectionRef = (
    userId: string
): CollectionReference =>
    collection(db, userCollection, userId, notificationCollection);

// export const getNotificationCollection = (
//     userId: string
// ): CollectionReference => collection(db, 'users', userId, 'notifications');
