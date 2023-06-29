'use client';

import Box, { BoxProps } from '@mui/material/Box';

import { Image } from '@/components/Image';
import { AssetMediaMetadata } from '@/config/types/asset';

type Props = BoxProps & {
    data: AssetMediaMetadata;
    onSelect?: () => void;
};

export function ImageCarouselItem({ sx, data, onSelect }: Props): JSX.Element {
    return (
        <Box onClick={onSelect}>
            <Image
                sx={{
                    width: '100%',
                    borderRadius: '1px 1px 0 0',
                    ...sx
                }}
                uri={data.uri}
                alt={data.title}
            />
        </Box>
    );
}
