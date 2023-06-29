'use client';

import Stack from '@mui/material/Stack';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { withEllipsis } from '@/libs/utils';
import { Typography } from '@/components/Typography';
import { AssetRecordPicture } from '@/features/AssetRecordPicture';

type Props = {
    asset: AssetItem;
};

export function ChatRoomAssetOverview({ asset }: Props): JSX.Element {
    return (
        <Row
            spacing={2}
            sx={{
                p: 2,
                width: 365,
                bgcolor: 'common.black'
            }}>
            <AssetRecordPicture
                size={80}
                assetId={asset.id}
                assetName={asset.name}
            />
            <Stack spacing={1} alignItems="flex-start">
                <Typography
                    sx={{ textAlign: 'left' }}
                    uppercased
                    variant="body1"
                    title={asset.name}>
                    {withEllipsis(asset.name, 50)}
                </Typography>
                <Typography italic variant="body1" color="primary.light">
                    {asset.merchantName}
                </Typography>
            </Stack>
        </Row>
    );
}
