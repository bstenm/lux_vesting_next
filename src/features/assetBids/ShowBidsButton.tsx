'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Spinner } from '@/components/Spinner';
import { AssetItem } from '@/config/types/asset';
import { BidIconButton } from '@/components/iconButtons/BidIconButton';
import { AssetBidsDrawer } from '@/features/assetBids/AssetBidsDrawer';
import { useFetchAssetBids } from '@/features/assetBids/useFetchAssetBids';

type Props = {
    data: AssetItem;
};

export function ShowBidsButton({ data }: Props): JSX.Element {
    const [bids, fetching] = useFetchAssetBids(data.id);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleOpen = (): void => {
        setOpen(true);
    };

    if (fetching) {
        return (
            <Box sx={{ pt: 1, width: 41, height: 36 }}>
                <Spinner />
            </Box>
        );
    }

    return (
        <>
            <Badge
                color="error"
                overlap="circular"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                badgeContent={bids.length}>
                <BidIconButton title="bids" onClick={handleOpen} />
            </Badge>
            <AssetBidsDrawer
                open={open}
                asset={data}
                handleClose={handleClose}
            />
        </>
    );
}
