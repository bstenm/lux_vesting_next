'use client';

import Box from '@mui/material/Box';
import maxBy from 'lodash/maxBy';
import { styled } from '@mui/material';

import { Spinner } from 'components/Spinner';
import { RootState } from 'redux/store';
import { Typography } from 'components/Typography';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { getAssetData } from 'state/assets/selectors';
import { useFetchAssetBids } from 'features/assetBids/useFetchAssetBids';

import { AssetBidRow } from './AssetBidRow';

type Props = {
    assetId: string;
    handleClose: () => void;
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
    handleClose,
    handleOpenChat
}: Props): JSX.Element {
    const { nftId, name } = useAppSelector((state: RootState) =>
        getAssetData(state, assetId)
    );

    const [bids, fetchingBids] = useFetchAssetBids(assetId);

    const highestBid = maxBy(bids, 'value');

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
                    nftId={nftId}
                    assetId={assetId}
                    assetName={name}
                    handleClose={handleClose}
                    isHighestBid={bid === highestBid}
                    handleOpenChat={handleOpenChat}
                />
            ))}
        </Box>
    );
}
