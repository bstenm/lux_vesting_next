'use client';

import Stack from '@mui/material/Stack';
import sortBy from 'lodash/sortBy';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Row } from 'components/Row';
import { Tooltip } from 'components/Tooltip';
import { AssetItem } from 'config/types/asset';
import { ImageCarousel } from 'features/imageCarousel/ImageCarousel';
import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { getItemPictures } from 'libs/utils';
import { AssetHighestBid } from 'features/assetBids/AssetHighestBid';
import { TitledAmountData } from 'components/dataPoints/TitledAmountData';

import { AssetCardTitle } from './AssetCardTitle';
import { AssetFavoriteButton } from './AssetFavoriteButton';

type Props<T> = {
    data: T;
    children: React.ReactNode;
    onSelect: () => void;
};

const Card = styled(MuiCard)`
    width: 220px;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(180deg, #212121 0%, rgba(33, 33, 33, 0) 100%);
`;

export function AssetCard<T extends AssetItem>({
    data,
    children,
    onSelect
}: Props<T>): JSX.Element {
    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    return (
        <Tooltip title={data.name} noFormatting>
            <Card>
                {userIsLoggedIn && (
                    <Row
                        sx={{
                            ml: '176px',
                            mt: '-12px',
                            zIndex: 1000,
                            position: 'absolute'
                        }}
                        justifyContent="flex-end">
                        <AssetFavoriteButton assetId={data.id} />
                    </Row>
                )}
                <ImageCarousel
                    sx={{ height: 150, objectPosition: 'center 50%' }}
                    images={sortBy(getItemPictures(data), 'priority')}
                    onSelect={onSelect}
                />
                <CardContent
                    onClick={onSelect}
                    sx={{
                        pt: 1,
                        pb: 0,
                        textAlign: 'center',
                        color: 'common.white'
                    }}>
                    <Stack spacing={1}>
                        <AssetCardTitle title={data.name} />
                        <Row
                            sx={{ pb: 1, width: '100%' }}
                            justifyContent="space-between">
                            <TitledAmountData
                                data={data.price}
                                align="flex-end"
                                textId="floorPrice"
                            />
                            <AssetHighestBid id={data.id} align="flex-start" />
                        </Row>
                    </Stack>
                </CardContent>
                <CardActions>{children}</CardActions>
            </Card>
        </Tooltip>
    );
}
