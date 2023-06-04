'use client';

import { query, Query } from 'firebase/firestore';

import { BidItem } from 'config/types/asset';
import { HookOptions } from 'config/types';
import { getBidCollectionRef } from 'libs/firebaseApp';
import { useRealTimeFetchCollection } from 'libs/hooks/useRealTimeFetchCollection';

type StateLogic = [BidItem[], boolean];

export const useFetchAssetBids = (
    assetId: string,
    op: HookOptions = {}
): StateLogic =>
    useRealTimeFetchCollection<BidItem>(
        query(getBidCollectionRef(assetId)) as Query<BidItem>,
        'errorRetrievingAssetBids',
        op
    );

// TODO: Remove?
// import { assetsActions } from 'state/assets/assetsSlice';
// import { biddingService } from 'services/BiddingService';
// import { BidItem, HookOptions } from 'config/types';

// import { DatabaseService } from 'services/DatabaseService';
// import { useAsyncAction } from './useAsyncAction';
// import { useAppDispatch } from './useAppDispatch';

// type StateLogic = [(params: ActionParams) => Promise<BidItem[]>, boolean];

// type ActionParams = {
//     id: string;
//     nftId: number;
// };

// export const useFetchAssetBids = (op: HookOptions = {}): StateLogic => {
//     const dispatch = useAppDispatch();

//     const action = async ({ id, nftId }: ActionParams): Promise<BidItem[]> => {
//         // If has not been listed yet then it does ont have a nft id
//         // TODO: Restore?
//         // const bids = nftId ? await biddingService.getItemBids(nftId) : [];
//         const bids = await DatabaseService.getAssetBids(id);
//         dispatch(assetsActions.updateData({ id, bids }));
//         return bids;
//     };

//     const [fetchBids, fetching] = useAsyncAction<ActionParams, BidItem[]>(action, {
//         error: 'errorRetrievingAssetBids',
//         ...op
//     });

//     return [fetchBids, fetching];
// };
