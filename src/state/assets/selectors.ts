import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import uniqBy from 'lodash/uniqBy';

import {
    AssetItem,
    MediaType,
    AssetMediaMetadataItem
} from 'config/types/asset';
import { Bid } from 'config/types';
import { RootState } from 'app/store';

export const getAllAssets = (state: RootState): AssetItem[] => state.assets;

export const getAssetData = (state: RootState, id: string): AssetItem => {
    return state.assets.find((e: AssetItem) => e.id === id);
};

export const getAssetBids = (state: RootState, id: string): Bid[] => {
    const { bids } = getAssetData(state, id);

    // We sort the bids by value desc and by created at desc and
    // make sure all potential duplicate (bidder, value) is removed
    return uniqBy(
        sortBy(bids, ['value', 'createdAt']).reverse(),
        (e) => e.bidder && e.value
    );
};

export const getAssetHighestBid = (
    state: RootState,
    id: string
): Bid | undefined => maxBy(getAssetBids(state, id), 'value');

export const getAssetMedias = (
    state: RootState,
    id: string,
    mediaType: MediaType
): AssetMediaMetadataItem[] => {
    const medias = getAssetData(state, id)?.medias.filter(
        (e) => e.type === mediaType
    );
    return sortBy(medias, 'priority');
};

export const getAssetPictures = (
    state: RootState,
    id: string
): AssetMediaMetadataItem[] => getAssetMedias(state, id, 'picture');

export const getAssetFollowers = (state: RootState, id: string): string[] => {
    const { followers } = getAssetData(state, id);
    return followers ?? [];
};

export const getAssetCoverPicture = (
    state: RootState,
    id: string
): AssetMediaMetadataItem | undefined => {
    const pics = getAssetPictures(state, id);
    const pic = pics.find((e: AssetMediaMetadataItem) => e.priority === 1);
    return pic;
};
