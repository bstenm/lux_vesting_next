'use client';

import maxBy from 'lodash/maxBy';
import { MouseEvent, MouseEventHandler, useState } from 'react';

import { AssetItem } from '@/config/types/asset';
import { useBidOnItem } from '@/features/placeBid/useBidOnItem';
import { useFetchAssetBids } from '@/features/assetBids/useFetchAssetBids';

type StateLogic = {
    onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
    invalidBid: boolean;
    processing: boolean;
    handleBidChange: (value: string) => void;
};

export const useBidInput = (
    item: AssetItem,
    onSuccess?: () => void
): StateLogic => {
    const [bids, fetchingBids] = useFetchAssetBids(item.id);

    const highestBid = maxBy(bids, 'value')?.value;

    const [amount, setValue] = useState<string>('');

    const [bidOnItem, placingBid] = useBidOnItem(item, { onSuccess });

    const value = parseInt(amount, 10);

    const invalidBid = !value || (!!highestBid && value <= highestBid);

    const handleBidChange = (val: string): void => {
        setValue(val.trim());
    };

    const onSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
        if (invalidBid) return;
        const bidders = bids.map((e) => e.bidder);
        await bidOnItem({ value, bidders });
    };

    const processing = fetchingBids || placingBid;

    return { onSubmit, invalidBid, handleBidChange, processing };
};
