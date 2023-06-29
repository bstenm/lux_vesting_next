'use client';

import { HookOptions } from '@/config/types';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useUpdateAssetData } from '@/libs/hooks/useUpdateAssetData';
import { useUpdateAssetStatus } from '@/libs/hooks/useUpdateAssetStatus';

import { useFetchUserData } from './useFetchUserData';

type Param = {
    price: number;
    assetId: string;
};

type StateLogic = [(param: Param) => Promise<void>, boolean];

export const useBuyMarketItem = (
    id: string,
    bidder: string,
    op: HookOptions = {}
): StateLogic => {
    const merchantId = bidder;

    const [fetchUserData] = useFetchUserData({ silent: true });

    const [updateAssetData] = useUpdateAssetData(id);

    const [updateAssetStatus] = useUpdateAssetStatus(id, merchantId, 'listing');

    const action = async (param: Param): Promise<void> => {
        const { assetId } = param;
        // await biddingService.endAuction(assetId);
        const userData = await fetchUserData({ id: bidder });
        const merchantName = userData.name;
        await updateAssetData({ merchantName, merchantId });
        await updateAssetStatus('unprocessed');
    };

    const [buyMarketItem, processing] = useAsyncAction<Param, void>(action, {
        info: 'blockchainTransactionStarted',
        error: 'errorSellingItem',
        success: 'successSellingItem',
        ...op
    });

    return [buyMarketItem, processing];
};
