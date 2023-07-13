'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ElementType } from 'react';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { DarkButton } from '@/components/buttons/DarkButton';
import { LightDivider } from '@/components/LightDivider';
import { ImageMagnifier } from '@/features/imageMagnifier/ImageMagnifier';
import { AssetHighestBid } from '@/features/assetBids/AssetHighestBid';
import { TitledAmountData } from '@/components/dataPoints/TitledAmountData';
import { getItemPics, getCertificateOfAuthenticity } from '@/libs/utils';

import { AssetSpecs } from './AssetSpecs';
import { LinkToPictures } from './LinkToPictures ';

type Props = {
    data: AssetItem;
    Actions?: ElementType;
    selected?: number;
    onSelectPic: (picIndex: number) => void;
    handleClose?: () => void;
};

export function AssetSpecPanel({
    data,
    Actions,
    selected = 0,
    onSelectPic,
    handleClose
}: Props): JSX.Element {
    const coaURI = getCertificateOfAuthenticity(data);

    const pictures = getItemPics(data);

    return (
        <Stack justifyContent="space-between">
            {coaURI && (
                <a href={coaURI} target="_blank" rel="noreferrer">
                    <DarkButton textId="viewCOA" />
                </a>
            )}
            <Stack sx={{ mt: 3 }} spacing={4}>
                <AssetSpecs data={data} />
                <Stack
                    sx={{
                        pb: 1,
                        width: '350px',
                        bottom: 0,
                        bgcolor: '#151515',
                        position: 'fixed'
                    }}
                    spacing={3}>
                    <LightDivider />
                    <Row spacing={8} alignItems="baseline">
                        <TitledAmountData
                            data={data.price}
                            align="center"
                            textId="floorPrice"
                        />
                        <AssetHighestBid id={data.id} align="center" />
                    </Row>
                    {Actions && (
                        <Actions data={data} handleClose={handleClose} />
                    )}
                    <Box sx={{ display: { sm: 'none' }, mt: 2 }}>
                        <ImageMagnifier
                            src={pictures[selected].uri}
                            mouseOffsetPosY={450}
                            backgroundOffsetPosY={1400}
                        />
                    </Box>
                    <Box sx={{ mt: 4, display: { md: 'none' } }}>
                        <LinkToPictures
                            pics={pictures}
                            onSelect={onSelectPic}
                        />
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
}
