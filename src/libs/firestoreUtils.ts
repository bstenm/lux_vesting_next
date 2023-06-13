import {
    DocumentData,
    QuerySnapshot,
    SnapshotOptions,
    DocumentSnapshot
} from 'firebase/firestore';
import { uuid } from 'uuidv4';

export const setRecordWithDate = <T>(data: T): T & { createdAt: number } => ({
    ...data,
    createdAt: Date.now()
});

export const setRecordWithUpdateDate = <T>(
    data: T
): T & { updatedAt: number } => ({
    ...data,
    updatedAt: Date.now()
});

export const setRecordWithId = <T>(data: T): T & { id: string } => ({
    ...data,
    id: uuid()
});

export const setRecordWithIdAndDate = <T>(
    data: T
): T & { id: string; createdAt: number } =>
    setRecordWithId(setRecordWithDate(data));

export const getDocSnapshotData = <T>(
    snapshot: DocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
): T => {
    let item = snapshot.data(options);
    item = item && { ...item, id: snapshot.id };
    return item as T;
};

export const getQuerySnapshotData = <T>(
    snapshot: QuerySnapshot<DocumentData>
): T[] => {
    const items: T[] = [];
    snapshot.forEach((d) => {
        let data = d.data();
        data = data && { ...data, id: d.id };
        items.push(data as T);
    });
    return items;
};
