import { DocumentReference } from 'firebase/firestore';

import { AssetItem } from '@/config/types/asset';
import { HookOptions } from '@/config/types';
import { getAssetDocumentRef } from '@/libs/firebaseApp';

import { useRealTimeFetchDocument } from './useRealTimeFetchDocument';

type HookLogic = [AssetItem, boolean];

export const useFetchAssetData = (
    assetId: string,
    op: HookOptions = {}
): HookLogic =>
    useRealTimeFetchDocument<AssetItem>(
        getAssetDocumentRef(assetId) as DocumentReference<AssetItem>,
        'errorRetrievingAsset',
        op
    );
