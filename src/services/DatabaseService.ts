import { flatten, remove } from 'lodash';
import {
    query,
    where,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    arrayUnion,
    SetOptions,
    QueryFieldFilterConstraint
} from 'firebase/firestore';

import {
    Bid,
    AssetItem,
    NewAsset,
    AssetListingData,
    AssetMediaMetadata,
    AssetMediaMetadataItem,
    AssetAuthenticationStatusData,
    AssetStatusType
} from 'config/types/asset';
import {
    setRecordWithId,
    setRecordWithDate,
    getDocSnapshotData,
    getQuerySnapshotData,
    setRecordWithIdAndDate,
    setRecordWithUpdateDate
} from 'libs/firestoreUtils';
import {
    userCollectionRef,
    assetCollectionRef,
    getBidCollectionRef,
    getBidDocumentRef,
    getUserDocumentRef,
    getAssetDocumentRef,
    getMessageDocumentRef,
    getUserNotificationDocumentRef
} from 'libs/firebaseApp';
import { User } from 'config/types/user';
import { logger } from 'libs/logger';
import { Message, AssetNotification, SelectFilterEntry } from 'config/types';

const log = logger('Database');

export class DatabaseService {
    public static async getUserById(id: string): Promise<User> {
        log.debug('Attempt to get user with id:', id);
        const docRef = getUserDocumentRef(id);
        const docSnap = await getDoc(docRef);
        const data = getDocSnapshotData<User>(docSnap);
        log.debug('Successfully retrieved user:', data);
        return data;
    }

    public static async getUserByEmail(email: string): Promise<User> {
        log.debug('Attempt to get user with email:', email);
        const q = query(userCollectionRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const [data] = getQuerySnapshotData<User>(querySnapshot);
        log.debug('Successfully retrieved user:', data);
        return data;
    }

    public static async getAllAssets(): Promise<AssetItem[]> {
        log.debug('Get all assets');
        const q = query(assetCollectionRef);
        const querySnapshot = await getDocs(q);
        const data = getQuerySnapshotData<AssetItem>(querySnapshot);
        log.debug('Successfully retrieved all assets:', data);
        return data;
    }

    public static generateFilterCondition(
        filter: SelectFilterEntry
    ): QueryFieldFilterConstraint | QueryFieldFilterConstraint[] {
        const { value, type, name } = filter;
        switch (type) {
            case 'range':
                return value.length === 2
                    ? [where(name, '>=', value[0]), where(name, '<', value[1])]
                    : [];
            case 'multiValues':
                return value.length ? where(name, 'in', value) : [];
            case 'singleValue':
                return value ? where(name, '==', value) : [];
            default:
                return [];
        }
    }

    public static getFilterConditions(
        filters: SelectFilterEntry[]
    ): (QueryFieldFilterConstraint | QueryFieldFilterConstraint[])[][] {
        const clone = [...filters];
        const rangeFilters = remove(clone, (filter) => filter.type === 'range');
        const filtersList = rangeFilters.length
            ? rangeFilters.map((rangeFilter) => clone.concat(rangeFilter))
            : [filters];
        return filtersList.map((filterList) =>
            filterList.map(this.generateFilterCondition)
        );
    }

    public static async getAllMarketItems(
        filters: SelectFilterEntry[] = []
    ): Promise<AssetItem[]> {
        const filterConditionsList = this.getFilterConditions(filters);
        const queryConditionsList =
            filterConditionsList.length === 0 ? [[]] : filterConditionsList;
        const queryList = queryConditionsList.map((conditions) =>
            query(
                assetCollectionRef,
                where('listing.status', '==', 'approved'),
                ...flatten(conditions)
            )
        );
        const querySnapshotList = await Promise.all(queryList.map(getDocs));
        const assetItemList = flatten(
            querySnapshotList.map((querySnapshot) =>
                getQuerySnapshotData<AssetItem>(querySnapshot)
            )
        );
        return assetItemList;
    }

    public static async getMerchantAssets(id: string): Promise<AssetItem[]> {
        log.debug('Get assets from merchant id:', id);
        const snap = await getDocs(
            query(assetCollectionRef, where('merchantId', '==', id))
        );
        const data = getQuerySnapshotData<AssetItem>(snap);
        log.debug('Successfully retrieved merchant assets', data, 'for:', id);
        return data;
    }

    public static async getAssetData(id: string): Promise<AssetItem> {
        log.debug('Get data for asset id:', id);
        const docSnap = await getDoc(getAssetDocumentRef(id));
        const data = getDocSnapshotData<AssetItem>(docSnap);
        log.debug('Successfully retrieved', data, 'for asset:', id);
        return data;
    }

    public static async getAssetBids(assetId: string): Promise<Bid[]> {
        log.debug('Retrieving bid for asset:', assetId);
        const querySnapshot = await getDocs(getBidCollectionRef(assetId));
        const data = getQuerySnapshotData<Bid>(querySnapshot);
        log.debug('Successfully retrieved bids', data, ' for asset ', assetId);
        return data;
    }

    public static async getAssetDataFromTokenURI(
        tokenURI: string
    ): Promise<AssetItem> {
        log.debug('Get data for asset with token uri:', tokenURI);
        const q = query(assetCollectionRef, where('tokenURI', '==', tokenURI));
        const querySnapshot = await getDocs(q);
        const [data] = getQuerySnapshotData<AssetItem>(querySnapshot);
        // const docRef = doc(db, assetCollection, id);
        // const docSnap = await getDoc(docRef);
        // const data = getDocSnapshotData<AssetItem>(docSnap);
        log.debug('Successfully retrieved', data, 'with token uri:', tokenURI);
        return data;
    }

    public static async addUser(data: User): Promise<void> {
        log.debug('Add user data into collection:', data);
        // The user id is their ethereum account number
        const docRef = getUserDocumentRef(data.account);
        await setDoc(docRef, setRecordWithDate<User>(data));
        log.debug('Successfully added user with id', data.account);
    }

    public static async addNewAsset(data: NewAsset): Promise<string> {
        log.debug('Add asset:', data.name);
        const record = setRecordWithDate<NewAsset>(data);
        const { id } = await addDoc(assetCollectionRef, record);
        return id;
    }

    public static async addMediasToAsset(
        assetId: string,
        medias: AssetMediaMetadata[]
    ): Promise<AssetMediaMetadataItem[]> {
        log.debug('Add media metadatas:', medias, 'to asset:', assetId);
        const assetRef = getAssetDocumentRef(assetId);
        const data = medias.map((m) => setRecordWithId<AssetMediaMetadata>(m));
        await updateDoc(assetRef, { medias: arrayUnion(...data) });
        log.debug('Successfully added medias', data, ' to asset ', assetId);
        return data;
    }

    public static async addBidToAsset(
        assetId: string,
        data: Bid
    ): Promise<void> {
        log.debug('Adding bid:', data, 'to item:', assetId);
        const docData = setRecordWithIdAndDate(data);
        const docRef = getBidDocumentRef(assetId, docData.id);
        await setDoc(docRef, docData);
        log.debug('Successfully added bid', data, ' to item ', assetId);
    }

    public static async addMessage(
        assetId: string,
        data: Message
    ): Promise<void> {
        log.debug('Adding message:', data, 'to asset:', assetId);
        const docData = setRecordWithIdAndDate(data);
        const docRef = getMessageDocumentRef(assetId, docData.id);
        await setDoc(docRef, docData);
        log.debug('Successfully added message', data, 'to asset:', assetId);
    }

    public static async addNotificationToUsers(
        userIds: string[],
        data: AssetNotification
    ): Promise<void> {
        log.debug('Adding notification:', data, 'to userIds:', userIds);
        Promise.all(
            userIds.map(async (uid) => {
                const docData = setRecordWithIdAndDate(data);
                const docRef = getUserNotificationDocumentRef(uid, docData.id);
                await setDoc(docRef, docData);
            })
        );
        log.debug('Successfully added notification', data, 'to:', userIds);
    }

    public static async updateUserData(
        userId: string,
        data: Partial<User>
    ): Promise<void> {
        log.debug('Set data :', data, ' for user: ', userId);
        const opts: SetOptions = { merge: true };
        await setDoc(getUserDocumentRef(userId), data, opts);
        log.debug('Successfully updated user data with:', data);
    }

    public static async updateAssetData(
        id: string,
        data: Partial<AssetItem>
    ): Promise<void> {
        log.debug('Update asset with data:', data);
        await updateDoc(getAssetDocumentRef(id), data);
        log.debug('Successfully updated asset', id, 'with data:', data);
    }

    public static async updateAssetStatus(
        id: string,
        statusType: AssetStatusType,
        status: AssetAuthenticationStatusData | AssetListingData
    ): Promise<void> {
        log.debug('Update asset status with data:', status);
        const data = { [statusType]: setRecordWithUpdateDate({ status }) };
        await updateDoc(getAssetDocumentRef(id), data);
        log.debug('Successfully updated asset', id, 'with data:', data);
    }

    public static async updateAssetMedias(
        assetId: string,
        medias: AssetMediaMetadataItem[]
    ): Promise<void> {
        log.debug('Update media with:', medias, 'for asset:', assetId);
        await updateDoc(getAssetDocumentRef(assetId), { medias });
        log.debug('Successfully update media for asset', assetId);
    }

    public static async deleteNotification(
        id: string,
        uid: string
    ): Promise<void> {
        log.debug('Deleting notification:', id, 'for user:', uid);
        await deleteDoc(getUserNotificationDocumentRef(uid, id));
        log.debug('Successfully deleted notification', id, 'for user :', uid);
    }
}
