'use client';

import { ManageAssetFilesIconButton } from './ManageAssetFilesIconButton';

type Props = {
    assetId: string;
};

export function ManageAssetDocsIconButton({ assetId }: Props): JSX.Element {
    return (
        <ManageAssetFilesIconButton assetId={assetId} mediaType="document" />
    );
}
