'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';

import { Image } from 'components/Image';
import { IconButton } from 'components/iconButtons/IconButton';
import { AssetMediaMetadata } from 'config/types/asset';

import { MediaItemCaption } from './MediaItemCaption';

type Props = {
    data: AssetMediaMetadata;
};

export function SortableMediaItem({ data }: Props): JSX.Element {
    const [onHover, setOnHover] = useState<boolean>(false);

    return (
        <Stack
            alignItems="center"
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}>
            {data.type === 'picture' ? (
                <Image
                    uri={data.uri}
                    title={data.title}
                    draggable={false}
                    size={100}
                />
            ) : (
                <>
                    <DescriptionIcon
                        sx={{ color: 'primary.light' }}
                        fontSize="large"
                    />
                    <MediaItemCaption data={data.title} />
                </>
            )}
            <IconButton sx={{ py: 0 }}>
                <MenuIcon
                    fontSize="small"
                    sx={{
                        color: 'primary.light',
                        opacity: onHover ? 1 : 0.4
                    }}
                />
            </IconButton>
        </Stack>
    );
}
