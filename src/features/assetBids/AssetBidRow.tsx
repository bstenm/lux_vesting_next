'use client';

import Box from '@mui/material/Box';
// import Swal from 'sweetalert2';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';

import { Bid } from 'config/types/asset';
import { Row } from 'components/Row';
import { Spinner } from 'components/Spinner';
import { DarkButton } from 'components/buttons/DarkButton';
import { Typography } from 'components/Typography';
import { PurpleButton } from 'components/buttons/PurpleButton';
import { defaultCurrencySymbol } from 'config';

import { useFetchUserData } from './useFetchUserData';

import { useBuyMarketItem } from './useBuyMarketItem';

type Props = {
    data: Bid;
    nftId: number;
    assetId: string;
    assetName: string;
    isHighestBid: boolean;
    handleClose: () => void;
    handleOpenChat: (id: string) => void;
};

export function AssetBidRow({
    data,
    nftId,
    assetId,
    assetName,
    handleClose,
    isHighestBid,
    handleOpenChat
}: Props): JSX.Element {
    const [buyMarketItem, processing] = useBuyMarketItem(assetId, data.bidder);

    const [username, setUsername] = useState<string>();

    const [fetchUserData, fetching] = useFetchUserData();

    const buy = (price: number): void => {
        buyMarketItem({ price, assetId, nftId });
    };

    useEffect(() => {
        (async () => {
            const userData = await fetchUserData({ id: data.bidder });
            setUsername(userData?.name);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ListItem
            sx={{ mb: 2 }}
            secondaryAction={
                <Row spacing={2}>
                    <DarkButton
                        contained
                        size="small"
                        textId="message"
                        onClick={() => handleOpenChat(data.bidder)}
                    />
                    {isHighestBid ? (
                        <PurpleButton
                            contained
                            sx={{ width: 65 }}
                            size="small"
                            textId="accept"
                            loading={processing}
                            onClick={() => {
                                handleClose();
                                // Swal.fire({
                                //     text: `You are about to sell ${assetName} for ${defaultCurrencySymbol}${data.value}`,
                                //     icon: 'warning',
                                //     cancelButtonColor: '#d33',
                                //     showCancelButton: true,
                                //     confirmButtonText: 'Authorize',
                                //     confirmButtonColor: '#3085d6'
                                // }).then((result) => {
                                //     if (result.isConfirmed) {
                                //         buy(data.value);
                                //     }
                                // });
                            }}
                        />
                    ) : (
                        <Box sx={{ width: 65 }} />
                    )}
                </Row>
            }>
            <Row spacing={2}>
                <Typography bold color="primary.light">
                    {defaultCurrencySymbol}
                    {data.value.toLocaleString()}
                </Typography>
                <Typography textId="by" />
                {fetching ? (
                    <Spinner />
                ) : (
                    <Typography
                        sx={{ maxWidth: 210 }}
                        color="primary.light"
                        showMissing={!fetching && !username}
                        noWrap>
                        {username}
                    </Typography>
                )}
            </Row>
        </ListItem>
    );
}
