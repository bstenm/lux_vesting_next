import {
    FieldValue,
    DocumentData,
    QuerySnapshot,
    DocumentSnapshot,
    SnapshotOptions,
    serverTimestamp
} from 'firebase/firestore';
import { uuid } from 'uuidv4';

export const setRecordWithDate = <T>(
    data: T
): T & { createdAt: FieldValue } => ({
    ...data,
    createdAt: serverTimestamp()
});

export const setRecordWithUpdateDate = <T>(
    data: T
): T & { updatedAt: FieldValue } => ({
    ...data,
    updatedAt: serverTimestamp()
});

export const setRecordWithId = <T>(data: T): T & { id: string } => ({
    ...data,
    id: uuid()
});

export const setRecordWithIdAndDate = <T>(
    data: T
): T & { id: string; createdAt: FieldValue } =>
    setRecordWithId(setRecordWithDate(data));

export const getDocSnapshotData = <T>(
    snapshot: DocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
): T => {
    let item = snapshot.data(options);
    item = item && { ...item, id: snapshot.id };
    if (item?.createdAt) {
        item.createdAt = item.createdAt.toMillis();
    }
    return item as T;
};

export const getQuerySnapshotData = <T>(
    snapshot: QuerySnapshot<DocumentData>
): T[] => {
    const items: T[] = [];
    snapshot.forEach((d) => {
        let data = d.data();
        data = data && { ...data, id: d.id };
        if (data?.createdAt) {
            data.createdAt = data.createdAt.toMillis();
        }
        items.push(data as T);
    });
    return items;
};
