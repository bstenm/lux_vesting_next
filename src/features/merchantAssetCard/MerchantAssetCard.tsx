'use client';

import { Stack } from '@mui/material/';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

import { Row } from '@/components/Row';
import { adminID } from '@/config';
import { AssetItem } from '@/config/types/asset';
import { ImageCarousel } from '@/features/imageCarousel/ImageCarousel';
import { getItemPictures } from '@/libs/utils';
import { EmailIconButton } from '@/components/iconButtons/EmailIconButton';
import { FullViewIconButton } from '@/components/iconButtons/FullViewIconButton';
import { SendMessageButton } from '@/features/adminAssetList/SendMessageButton';
import { EditAssetDataIconButton } from '@/features/editAssetListingDataForm/EditAssetDataIconButton';
import { ManageAssetPicsIconButton } from '@/features/manageAssetFilesModal/ManageAssetPicsIconButton';
import { ManageAssetDocsIconButton } from '@/features/manageAssetFilesModal/ManageAssetDocsIconButton';

import {
    ListingStatusView,
    ManageListingStatusButton
} from './ManageListingStatusButton';
import { AssetCardTitle } from './AssetCardTitle';
import { ManageAuthenticationStatusButton } from './ManageAuthenticationStatusButton';

type Props<T> = {
    data: T;
    onView: (data: T) => void;
    openView?: ListingStatusView;
};

const Card = styled(MuiCard)`
    width: 220px;
    border-radius: 5px;
    background: linear-gradient(180deg, #212121 0%, rgba(33, 33, 33, 0) 100%);
`;

export function MerchantAssetCard<T extends AssetItem>({
    data,
    onView,
    openView
}: Props<T>): JSX.Element {
    return (
        <Card>
            <ImageCarousel
                sx={{ height: 150, objectPosition: 'center 50%' }}
                images={getItemPictures(data)}
            />
            <CardContent sx={{ py: 0 }}>
                <Stack spacing={1.5} alignItems="stretch">
                    <AssetCardTitle title={data.name} />
                    {data.listing?.status === 'approved' ? (
                        <Row justifyContent="center">
                            <FullViewIconButton onClick={() => onView(data)} />
                            <EmailIconButton title="emailAdmin" />
                            <SendMessageButton
                                to={adminID}
                                title="messageAdmin"
                                asset={data}
                            />
                        </Row>
                    ) : (
                        <Row justifyContent="center">
                            <ManageAssetDocsIconButton assetId={data.id} />
                            <ManageAssetPicsIconButton assetId={data.id} />
                            <EditAssetDataIconButton assetId={data.id} />
                        </Row>
                    )}
                    <Stack spacing={1} justifyContent="center">
                        <ManageListingStatusButton
                            data={data}
                            openView={openView}
                        />
                        <ManageAuthenticationStatusButton data={data} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
