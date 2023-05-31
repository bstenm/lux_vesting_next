'use client';

import Stack from '@mui/material/Stack';

import { Row } from 'components/Row';
import { AssetItem } from 'config/types/asset';
import { DarkButton } from 'components/buttons/DarkButton';
import { GreenButton } from 'components/buttons/GreenButton';
import { AssetHighestBid } from 'features/assetBids/AssetHighestBid';
import { ProtectedComponent } from 'features/authButton/ProtectedComponent';

import { BidInput } from './BidInput';
import { useBidInput } from './useBidInput';

type Props = {
    data: AssetItem;
    handleClose: () => void;
};

export function PlaceBid({ data, handleClose }: Props): JSX.Element {
    const { onSubmit, processing, invalidBid, handleBidChange } = useBidInput(
        data,
        handleClose
    );

    return (
        <Stack spacing={4} alignItems="center">
            <ProtectedComponent action="placeBid">
                <AssetHighestBid id={data.id} align="center" />
                <BidInput onChange={handleBidChange} />
                <Row
                    sx={{ pt: 2 }}
                    spacing={4}
                    justifyContent={invalidBid ? 'center' : 'space-between'}>
                    <DarkButton
                        textId="cancel"
                        onClick={handleClose}
                        disabled={processing}
                    />
                    {!invalidBid && (
                        <GreenButton
                            textId="submit"
                            onClick={onSubmit}
                            loading={processing}
                            disabled={invalidBid}
                        />
                    )}
                </Row>
            </ProtectedComponent>
        </Stack>
    );
}
