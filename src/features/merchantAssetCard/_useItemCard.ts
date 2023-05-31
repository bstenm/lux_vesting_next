'use client';

import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import { useEffect } from 'react';

import { Bid } from 'config/types/index';
import { getItemPictures } from 'libs/utils';
import { useFetchAssetBids } from 'features/assetBids/useFetchAssetBids';
import { AssetItem, AssetMediaMetadata } from 'config/types/asset';

type StateLogic = {
    pictures: AssetMediaMetadata[];
    fetchingBid: boolean;
    highestBid?: Bid;
};

export const useItemCard = (item: AssetItem): StateLogic => {
    const highestBid = maxBy(item.bids, 'value');

    const [fetchBids, fetchingBid] = useFetchAssetBids();

    const pictures = sortBy(getItemPictures(item), 'priority');

    useEffect(() => {
        (async () => {
            const { id, nftId } = item;
            await fetchBids({ id, nftId });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { pictures, highestBid, fetchingBid };
};
