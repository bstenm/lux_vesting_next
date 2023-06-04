'use client';

import { Box, Stack } from '@mui/material';

import { Row } from 'components/Row';
import { AssetItem } from 'config/types/asset';
import { DataPoint } from 'components/DataPoint';
import { Typography } from 'components/Typography';
import { StandardCard } from 'components/StandardCard';
import { EmailIconButton } from 'components/iconButtons/EmailIconButton';
import { ShowBidsButton } from 'features/assetBids/ShowBidsButton';
import { AssetRecordPicture } from 'features/AssetRecordPicture';
import { formatDate, withEllipsis } from 'libs/utils';
import { EditAssetDataIconButton } from 'features/editAssetListingDataForm/EditAssetDataIconButton';
import { ManageAssetPicsIconButton } from 'features/manageAssetFilesModal/ManageAssetPicsIconButton';
import { ManageAssetDocsIconButton } from 'features/manageAssetFilesModal/ManageAssetDocsIconButton';

import { SendMessageButton } from './SendMessageButton';
import { ManageAdminListingStatusButton } from './adminAssetListing/ManageAdminAssetListingStatusButton';
import { ManageAdminAssetAuthenticationStatusButton } from './adminAssetAuthentication/ManageAdminAssetAuthenticationStatusButton';

type Props = {
    data: AssetItem;
    onViewListingData: (item: AssetItem) => void;
};

export function AdminAssetCard({
    data,
    onViewListingData
}: Props): JSX.Element {
    return (
        <StandardCard width="320px" sx={{ p: 0 }}>
            <Row spacing={0.4}>
                <Stack
                    sx={{
                        position: 'absolute',
                        borderRight: (theme) =>
                            `1px solid ${theme.palette.common.black}`
                    }}
                    justifyContent="space-between">
                    <ShowBidsButton data={data} />
                    <SendMessageButton to={data.merchantId} asset={data} />
                    <EmailIconButton title="emailMerchant" />
                    <ManageAssetDocsIconButton assetId={data.id} />
                    <ManageAssetPicsIconButton assetId={data.id} />
                    <EditAssetDataIconButton assetId={data.id} />
                </Stack>
                <Stack sx={{ p: 1.5, pl: 6.5 }}>
                    <Row spacing={2}>
                        <AssetRecordPicture
                            assetId={data.id}
                            assetName={data.name}
                        />
                        <Stack spacing={0.2}>
                            <Box sx={{ height: 50 }}>
                                <Typography
                                    uppercased
                                    variant="body1"
                                    title={data.name}>
                                    {withEllipsis(data.name, 40)}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="primary.light">
                                {data.merchantName}
                            </Typography>
                            <DataPoint
                                italic
                                data={formatDate(data.createdAt)}
                                color="primary.light"
                                variant="body2"
                            />
                        </Stack>
                    </Row>
                    <Stack sx={{ mt: 2 }} spacing={0.7}>
                        <ManageAdminListingStatusButton
                            status={data.listing?.status}
                            onViewListing={() => onViewListingData(data)}
                        />
                        <ManageAdminAssetAuthenticationStatusButton
                            data={data}
                        />
                    </Stack>
                </Stack>
            </Row>
        </StandardCard>
    );
}
