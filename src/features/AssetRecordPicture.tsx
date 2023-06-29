'use client';

import { RootState } from '@/redux/store';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { getAssetCoverPicture } from '@/state/assets/selectors';
import { Image } from '@/components/Image';

type Props = {
    size?: number;
    assetId: string;
    assetName: string;
};

export function AssetRecordPicture({
    size,
    assetId,
    assetName
}: Props): JSX.Element {
    const { uri } =
        useAppSelector((state: RootState) =>
            getAssetCoverPicture(state, assetId)
        ) || {};

    return (
        <Image
            sx={{ borderRadius: 0.5 }}
            uri={uri}
            alt={assetName}
            size={size ?? 95}
        />
    );
}
