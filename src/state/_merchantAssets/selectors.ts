import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import uniqBy from 'lodash/uniqBy';

import {
    AssetItem,
    MediaType,
    AssetMediaMetadataItem
} from 'config/types/asset';
import { Bid } from 'config/types';
import { RootState } from 'redux/store';

export const getMerchantAssets = (state: RootState): AssetItem[] =>
    state.merchantAssets;

export const getMerchantAsset = (state: RootState, id: string): AssetItem =>
    state.merchantAssets.find((e: AssetItem) => e.id === id);

export const getMerchantAssetBids = (state: RootState, id: string): Bid[] => {
    const { bids } = getMerchantAsset(state, id);

    // We sort the bids by value desc and by created at desc and
    // make sure all potential duplicate (bidder, value) is removed
    return uniqBy(
        sortBy(bids, ['value', 'createdAt']).reverse(),
        (e) => e.bidder && e.value
    );
};

export const getMerchantAssetHighestBid = (
    state: RootState,
    id: string
): Bid | undefined => maxBy(getMerchantAssetBids(state, id), 'value');

export const getMerchantAssetName = (state: RootState, id: string): string =>
    getMerchantAsset(state, id)?.name;

export const getMerchantAssetMedias = (
    state: RootState,
    id: string,
    mediaType: MediaType
): AssetMediaMetadataItem[] => {
    const medias = getMerchantAsset(state, id)?.medias.filter(
        (e) => e.type === mediaType
    );
    return sortBy(medias, 'priority');
};

export const getMerchantAssetPictures = (
    state: RootState,
    id: string
): AssetMediaMetadataItem[] => getMerchantAssetMedias(state, id, 'picture');

export const getMerchantAssetCoverPicture = (
    state: RootState,
    id: string
): AssetMediaMetadataItem | undefined => {
    const pics = getMerchantAssetPictures(state, id);
    const pic = pics.find((e: AssetMediaMetadataItem) => e.priority === 1);
    return pic;
};
