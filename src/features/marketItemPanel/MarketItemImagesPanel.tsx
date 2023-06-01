'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import sortBy from 'lodash/sortBy';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { Row } from 'components/Row';
import { Image } from 'components/Image';
import { AssetItem } from 'config/types/asset';
import { getItemPics } from 'libs/utils';
import { ImageMagnifier } from 'features/imageMagnifier/ImageMagnifier';

type Props = {
    data: AssetItem;
    selected?: number | null;
    onSelectPic: (index: number) => void;
};

const Container = styled(Row)(({ theme }) => ({
    height: '100vh',
    marginLeft: 80,
    backgroundColor: theme.palette.common.black,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0
    },
    [theme.breakpoints.down('sm')]: {
        border: '2px solid green'
    }
}));

const ViewOptionImg = styled(Image)({
    width: '100%',
    height: '15vh',
    cursor: 'pointer',
    objectFit: 'cover',
    borderRadius: 3,
    objectPosition: 'center'
});

export function MarketItemImagesPanel({
    data,
    selected,
    onSelectPic
}: Props): JSX.Element {
    const pictures = sortBy(getItemPics(data), 'priority');

    const [pictureIndex, setPictureIndex] = useState<number>(0);

    const onSelectView = (index: number): void => {
        setPictureIndex(index);
        onSelectPic(index);
    };

    const picture = pictures[selected ?? pictureIndex];

    return (
        <Container>
            <Box sx={{ height: '100vh', width: '100%' }}>
                <ImageMagnifier src={picture.uri} />
            </Box>
            <Stack
                sx={{
                    py: 0,
                    px: 2,
                    width: '20%',
                    display: { xs: 'none', md: 'block' }
                }}>
                {pictures.map((pic, index) => (
                    <Box key={pic.id} sx={{ height: '15vh', mt: '2vh' }}>
                        <ViewOptionImg
                            uri={pic.uri}
                            title={pic.title}
                            onClick={() => onSelectView(index)}
                            component="img"
                        />
                    </Box>
                ))}
            </Stack>
        </Container>
    );
}