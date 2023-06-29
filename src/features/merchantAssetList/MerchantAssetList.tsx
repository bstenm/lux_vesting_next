'use client';

import { useEffect } from 'react';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { getAllAssets } from '@/state/assets/selectors';
import { FetchingScreen } from '@/components/FetchingScreen';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { ListingStatusView } from '@/features/merchantAssetCard/ManageListingStatusButton';
import { MerchantAssetCard } from '@/features/merchantAssetCard/MerchantAssetCard';
import { useFetchMerchantAssets } from '@/features/adminAssetList/useFetchMerchantAssets';

type Props = {
    assetId?: string;
    openView?: ListingStatusView;
    onSelectitem: (data: AssetItem) => void;
};

export function MerchantAssetList({
    assetId,
    openView,
    onSelectitem
}: Props): JSX.Element {
    const list = useAppSelector(getAllAssets);

    const [fetchAssets, fetching] = useFetchMerchantAssets();

    useEffect(() => {
        fetchAssets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FetchingScreen<AssetItem[]> data={list} fetching={fetching}>
            {(data: AssetItem[]) => (
                <Row
                    sx={{ mt: 2, flexWrap: 'wrap', gap: 4 }}
                    justifyContent="space-between">
                    {data.map((asset: AssetItem) => (
                        <MerchantAssetCard
                            key={asset.id}
                            data={asset}
                            onView={onSelectitem}
                            openView={asset.id === assetId ? openView : 'none'}
                        />
                    ))}
                </Row>
            )}
        </FetchingScreen>
    );
}
