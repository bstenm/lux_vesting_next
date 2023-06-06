'use client';

import noop from 'lodash/noop';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { Row } from 'components/Row';
import { Image } from 'components/Image';
import { Tooltip } from 'components/Tooltip';
import { DocsIcon } from 'components/icons/DocsIcon';
import { RemoveIconButton } from 'components/iconButtons/RemoveIconButton';
import { OpenInNewIconButton } from 'components/iconButtons/OpenInNewIconButton';
import { AssetMediaMetadataItem } from 'config/types/asset';

type Props = {
    data: AssetMediaMetadataItem;
    onRemove: ({ id }: { id: string }) => void;
};

const Img = styled(Image)({
    width: 120,
    height: 120
});

export function UploadedMediaItem({ data, onRemove }: Props): JSX.Element {
    return (
        <Stack alignItems="center">
            <Tooltip title={data.title}>
                <a href={data.uri} target="_blank" rel="noreferrer">
                    {data.type === 'picture' ? (
                        <Img uri={data.uri} alt={data.title} />
                    ) : (
                        <DocsIcon size="large" />
                    )}
                </a>
            </Tooltip>
            <Row
                sx={{ mt: 0.2, bgcolor: 'common.black', borderRadius: 3 }}
                spacing={1}>
                <a href={data.uri} target="_blank" rel="noreferrer">
                    <OpenInNewIconButton onClick={noop} />
                </a>
                {/* <EditIconButton onClick={noop} /> */}
                <RemoveIconButton onClick={() => onRemove({ id: data.id })} />
            </Row>
        </Stack>
    );
}
