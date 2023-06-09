'use client';

import {
    MediaType,
    AssetCategory,
    AddNewAssetFormInput
} from '@/config/types/asset';
import { getFileTitle } from '@/libs/utils';
import { HookOptions } from '@/config/types';
import { assetsActions } from '@/state/assets/assetsSlice';
import { StorageService } from '@/services/StorageService';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';
import { getUserId, getUserName } from '@/state/user/selectors';

type StateLogic = [(values: AddNewAssetFormInput) => Promise<void>, boolean];

export const useAddNewAsset = ({
    silent,
    throws
}: HookOptions = {}): StateLogic => {
    const dispatch = useAppDispatch();

    const merchantId = useAppSelector(getUserId);

    const merchantName = useAppSelector(getUserName);

    const type: MediaType = 'picture';

    const error = 'errorAddingAsset';

    const success = 'assetSuccessfullyAdded';

    const action = async (values: AddNewAssetFormInput): Promise<void> => {
        const { picture, name } = values;
        // Hard-coded: Only one category of products  possible for now
        const category: AssetCategory = 'watch';
        const data = { name, category, merchantId, merchantName };
        // Save file to storage and get url pointing to it
        const uri = await StorageService.uploadMedia(picture);
        // Save the new asset in the database and get its id (generated by firestore)
        const id = await DatabaseService.addNewAsset(data);
        // Add the cover photo to the asset in the database
        const title = getFileTitle(picture);
        const metadata = { uri, type, name: picture.name, priority: 1, title };
        const medias = await DatabaseService.addMediasToAsset(id, [metadata]);
        // Finally update the state with the new asset
        const newAssetData = { ...data, id, medias };
        dispatch(assetsActions.addAssets(newAssetData));
    };

    const [addNewAsset, processing] = useAsyncAction<
        AddNewAssetFormInput,
        void
    >(action, { error, silent, throws, success });

    return [addNewAsset, processing];
};
