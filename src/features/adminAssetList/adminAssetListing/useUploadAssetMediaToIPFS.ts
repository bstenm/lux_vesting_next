'use client';

import {
    getFunctions,
    httpsCallable,
    connectFunctionsEmulator
} from 'firebase/functions';

import { logger } from 'libs/logger';
import { getApp } from 'firebase/app';
import { IPFSMedia, HookOptions } from 'config/types';
import { DEV_MODE, EMULATOR_ON } from 'config/constants';

import { useAsyncAction } from 'libs/hooks/useAsyncAction';

type StateLogic = [(media: IPFSMedia) => Promise<string>, boolean];

type CloudFunctionError = {
    error: string;
};

const { debug } = logger('useUploadAssetMediaToIPFS');

const functions = getFunctions(getApp());

// If we want to use the firebase cloud function emulator
if (EMULATOR_ON && DEV_MODE) {
    connectFunctionsEmulator(functions, 'localhost', 5001);
}

export const useUploadAssetMediaToIPFS = (op: HookOptions = {}): StateLogic => {
    const uploadMediaToIPFS = httpsCallable<
        IPFSMedia,
        string | CloudFunctionError
    >(functions, 'uploadMediaToIPFS');

    const action = async (media: IPFSMedia): Promise<string> => {
        debug('Calling server fn to upload media to IPFS: ', media);
        const { data } = await uploadMediaToIPFS(media);
        const { error } = data as CloudFunctionError;
        if (error && op.throws) {
            throw new Error(JSON.stringify(error));
        }
        debug('Path for new JSON file uploaded to IPFS (token URI): ', data);
        return data as string;
    };

    const [uploadAssetMediaToIPFS, processing] = useAsyncAction<
        IPFSMedia,
        string
    >(action, {
        info: 'startUploadingFileToIPFS',
        error: 'errorUploadingFileToIPFS',
        ...op
    });

    return [uploadAssetMediaToIPFS, processing];
};
