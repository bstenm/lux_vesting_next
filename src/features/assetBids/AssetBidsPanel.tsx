'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Spinner } from '@/components/Spinner';
import { Typography } from '@/components/Typography';
import { useFetchAssetBids } from '@/features/assetBids/useFetchAssetBids';

import { AssetBidRow } from './AssetBidRow';

type Props = {
    assetId: string;
    handleOpenChat: (id: string) => void;
};

const Centered = styled(Box)({
    width: 200,
    height: 'calc(100vh - 40px)',
    display: 'flex',
    justifyContent: 'center'
});

export function AssetBidsPanel({
    assetId,
    handleOpenChat
}: Props): JSX.Element {
    const [bids, fetchingBids] = useFetchAssetBids(assetId);

    if (fetchingBids) {
        return (
            <Centered>
                <Spinner />
            </Centered>
        );
    }

    if (!bids || !bids.length) {
        return (
            <Centered>
                <Typography
                    capitalized
                    sx={{ m: 'auto' }}
                    color="primary.light"
                    textId="noBidsYet"
                    fontSize={24}
                />
            </Centered>
        );
    }

    return (
        <Box sx={{ mt: 6, width: 500 }}>
            {bids.map((bid, ind) => (
                <AssetBidRow
                    // eslint-disable-next-line react/no-array-index-key
                    key={ind}
                    data={bid}
                    handleOpenChat={handleOpenChat}
                />
            ))}
        </Box>
    );
}
