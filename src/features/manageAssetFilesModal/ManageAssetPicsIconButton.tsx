'use client';

import { ManageAssetFilesIconButton } from './ManageAssetFilesIconButton';

type Props = {
    assetId: string;
};

export function ManageAssetPicsIconButton({ assetId }: Props): JSX.Element {
    return <ManageAssetFilesIconButton assetId={assetId} mediaType="picture" />;
}
