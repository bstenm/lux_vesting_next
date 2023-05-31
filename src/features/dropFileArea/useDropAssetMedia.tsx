'use client';

import { MediaType } from 'config/types/asset';
import { getFileTitle } from 'libs/utils';

import { useAddMediaToAsset } from './useAddMediaToAsset';

export type DragState = 'accept' | 'reject';

type StateLogic = {
    submit: (file: File) => void;
    submitting: boolean;
};

export const useDropAssetMedia = (
    assetId: string,
    mediaType: MediaType
): StateLogic => {
    const [addNewMedia, submitting] = useAddMediaToAsset(assetId);

    const submit = async (file: File): Promise<void> => {
        const title = getFileTitle(file);
        const { name } = file;
        await addNewMedia({ file, name, title, type: mediaType });
    };

    return { submit, submitting };
};
