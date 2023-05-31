'use client';

import {
    CreateListingParams,
    nftMarketplaceService
} from 'services/NFTMarketplaceService';
import { HookOptions } from 'config/types';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';

type StateLogic = [(params: CreateListingParams) => Promise<void>, boolean];

export const useCreateMarketplaceItem = (op: HookOptions = {}): StateLogic => {
    const action = (params: CreateListingParams): Promise<void> =>
        nftMarketplaceService.createListing(params);

    const [createMarketplaceItem, processing] = useAsyncAction<
        CreateListingParams,
        void
    >(action, {
        info: 'listingProcessLaunched',
        error: 'errorListingNewAsset',
        success: 'successListingNewAsset',
        ...op
    });

    return [createMarketplaceItem, processing];
};
