'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Stack, styled } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

import { Image } from 'components/Image';
import { Typography } from 'components/Typography';
import { AssetMediaMetadata } from 'config/types/asset';

import { Row } from './Row';
import { IconButton } from './iconButtons/IconButton';
import { RemoveIconButton } from './iconButtons/RemoveIconButton';

type Props = {
    data: AssetMediaMetadata;
    draggable?: boolean;
    onRemove?: ({ id }: { id: string }) => void;
};

const Name = styled(Typography)(
    ({ theme }) => `
        width: 150px;
        cursor: pointer;
        border: 1px solid ${theme.palette.common.black};
        padding: 3px;
        text-align: center;
        background-color:${theme.palette.common.black};
`
);

const Img = styled(Image)({
    width: 120,
    height: 120
});

export function MediaItem({ data, draggable, onRemove }: Props): JSX.Element {
    const [onHover, setOnHover] = useState<boolean>(false);

    return (
        <Stack
            alignItems="center"
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}>
            <a href={data.uri} target="_blank" rel="noreferrer">
                {data.type === 'picture' ? (
                    <Img uri={data.uri} title={data.title} draggable={false} />
                ) : (
                    <DescriptionIcon
                        sx={{ color: 'primary.light' }}
                        fontSize="large"
                    />
                )}
            </a>
            <Row
                sx={{ p: 0, mt: 0.5, width: 125 }}
                spacing={1}
                justifyContent="space-between">
                {onHover && onRemove ? (
                    <RemoveIconButton
                        sx={{ p: 0, m: 0 }}
                        onClick={() => onRemove({ id: data.id })}
                        draggable={false}
                    />
                ) : (
                    <Name variant="caption" title={data.title}>
                        {data.title}
                    </Name>
                )}
            </Row>
            {draggable && (
                <IconButton sx={{ py: 0 }}>
                    <MenuIcon
                        fontSize="small"
                        sx={{
                            color: 'primary.light',
                            opacity: onHover ? 1 : 0.4
                        }}
                    />
                </IconButton>
            )}
        </Stack>
    );
}
