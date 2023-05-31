'use client';

import { Row } from 'components/Row';
import { MediaItem } from 'components/MediaItem';
import { Typography } from 'components/Typography';
import { AssetMediaMetadataItem } from 'config/types/asset';

type Props = {
    documents: AssetMediaMetadataItem[];
};

export function AssetDocumentList({ documents }: Props): JSX.Element {
    if (documents?.length) {
        return (
            <Row spacing={4}>
                {documents.map((media) => (
                    <MediaItem key={media.uri} data={media} />
                ))}
            </Row>
        );
    }

    return (
        <Typography
            capitalized
            sx={{ color: 'text.secondary', opacity: 0.6 }}
            variant="h5"
            textId="noDocumentsUploaded"
        />
    );
}
