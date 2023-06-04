'use client';

import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';

import { Bid } from 'config/types/asset';
import { Row } from 'components/Row';
import { Spinner } from 'components/Spinner';
import { DarkButton } from 'components/buttons/DarkButton';
import { Typography } from 'components/Typography';
import { defaultCurrencySymbol } from 'config';

import { useFetchUserData } from './useFetchUserData';

type Props = {
    data: Bid;
    handleOpenChat: (id: string) => void;
};

export function AssetBidRow({ data, handleOpenChat }: Props): JSX.Element {
    const [username, setUsername] = useState<string>();

    const [fetchUserData, fetching] = useFetchUserData();

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
                <DarkButton
                    contained
                    size="small"
                    textId="message"
                    onClick={() => handleOpenChat(data.bidder)}
                />
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
