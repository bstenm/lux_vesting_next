'use client';

import uniq from 'lodash/uniq';
import remove from 'lodash/remove';

import {
    HookOptions,
    NotificationType,
    NewBidNotificationData
} from 'config/types';
import { getUserId } from 'state/user/selectors';
import { Bid, AssetItem } from 'config/types/asset';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { DatabaseService } from 'services/DatabaseService';
import { useSendNotifications } from 'features/notifications/useSendNotifications';

type ActionParams = { value: number; bidders?: string[] };

type StateLogic = [(param: ActionParams) => Promise<void>, boolean];

export const useBidOnItem = (
    asset: AssetItem,
    op: HookOptions = {}
): StateLogic => {
    const { id: assetId, merchantId, followers } = asset;

    const [sendNotifications] = useSendNotifications(asset.id, {
        silent: true
    });

    const bidder = useAppSelector(getUserId);

    const action = async ({
        bidders = [],
        value
    }: ActionParams): Promise<void> => {
        const newBid: Bid = { value, bidder };
        // TODO: Restore?
        // await biddingService.createBid(newBid);
        await DatabaseService.addBidToAsset(assetId, newBid);
        // Send a notification to all this asset bidders
        const type: NotificationType = 'newBidPlaced';
        const data = { type, value } as NewBidNotificationData;
        // Send a notification to the merchant, the other bidders and the followers
        const to = uniq([merchantId, ...bidders, ...(followers || [])]);
        remove(to, (e) => e === bidder);
        sendNotifications({ to, data });
    };

    const [bidOnItem, processing] = useAsyncAction<ActionParams, void>(action, {
        info: 'recordingBidOnBlockchain',
        error: 'errorBiddingOnItem',
        success: 'successBiddingOnItem',
        ...op
    });

    return [bidOnItem, processing];
};
