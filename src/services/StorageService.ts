import {
    ref,
    getStorage,
    uploadBytes,
    deleteObject,
    FirebaseStorage,
    getDownloadURL
} from 'firebase/storage';

import { firebaseApp } from 'libs/firebaseApp';
import { avatarsStoragePath, mediaStoragePath } from 'config/index';

const storage: FirebaseStorage = getStorage(firebaseApp);

export class StorageService {
    public static async uploadFile(
        file: File,
        storagePath: string
    ): Promise<string> {
        const storageRef = ref(storage, storagePath);
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
    }

    public static async uploadAvatar(
        file: File,
        name: string
    ): Promise<string> {
        return StorageService.uploadFile(file, `${avatarsStoragePath}/${name}`);
    }

    public static async uploadMedia(file: File): Promise<string> {
        // Prepend timestamp to file name to guarantee unique name
        const filePath = `${mediaStoragePath}/${Date.now()}_${file.name}`;
        return StorageService.uploadFile(file, filePath);
    }

    public static async removeMedia(uri: string): Promise<void> {
        const storageRef = ref(storage, uri);
        deleteObject(storageRef);
    }
}
