'use client';

import { useEffect } from 'react';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { getAllAssets } from '@/state/assets/selectors';
import { FetchingScreen } from '@/components/FetchingScreen';
import { useAppSelector } from '@/libs/hooks/useAppSelector';

import { AdminAssetCard } from './AdminAssetCard';
import { useAdminFetchAssets } from './useAdminFetchAssets';

type Props = {
    onSelectitem: (item: AssetItem) => void;
};

export function AdminAssetList({ onSelectitem }: Props): JSX.Element {
    const list = useAppSelector(getAllAssets);

    const [fetchAdminAssets, fetching] = useAdminFetchAssets();

    useEffect(() => {
        fetchAdminAssets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FetchingScreen<AssetItem[]> data={list} fetching={fetching}>
            {(data: AssetItem[]) => (
                <Row
                    sx={{
                        mt: 2,
                        flexWrap: 'wrap',
                        gap: 6
                    }}
                    justifyContent="flex-start">
                    {data.map((asset: AssetItem) => (
                        <AdminAssetCard
                            key={asset.id}
                            data={asset}
                            onViewListingData={onSelectitem}
                        />
                    ))}
                </Row>
            )}
        </FetchingScreen>
    );
}
