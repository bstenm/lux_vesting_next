'use client';

import maxBy from 'lodash/maxBy';

import { useFetchAssetBids } from 'features/assetBids/useFetchAssetBids';
import { Bid, AssetItem, AssetMediaMetadataItem } from 'config/types/asset';
import { getItemPics, getCertificateOfAuthenticity } from 'libs/utils';

type StateLogic = {
    coaURI?: string;
    pictures: AssetMediaMetadataItem[];
    highestBid?: Bid;
    fetchingBid: boolean;
};

export const useMarketItemSpecPanel = (data: AssetItem): StateLogic => {
    const coaURI = getCertificateOfAuthenticity(data);

    const pictures = getItemPics(data);

    const [bids, fetchingBid] = useFetchAssetBids(data.id);

    const highestBid = maxBy(bids, 'value');

    return {
        coaURI,
        pictures,
        highestBid,
        fetchingBid
    };
};
