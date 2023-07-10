'use client';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { AssetItem } from '@/config/types/asset';
import { PlaceBidButton } from '@/features/placeBid/PlaceBidButton';
import { ListingStatusView } from '@/features/merchantAssetCard/ListingStatusButton';
import { MerchantAssetList } from '@/features/merchantAssetList/MerchantAssetList';
import { ProtectedComponent } from '@/features/authButton/ProtectedComponent';
import { ComponentWithSelectedAssetInDrawer } from '@/layouts/ComponentWithSelectedAssetInDrawer';

type ListProps = {
    onSelectitem: (item: AssetItem) => void;
};

function MerchantAssetsPage(): JSX.Element {
    const { slug } = useParams() as { slug?: string };

    const [action, assetId] = slug?.split('/') ?? [];

    const List = useCallback(
        (props: ListProps) => (
            <ProtectedComponent fullscreen>
                <MerchantAssetList
                    assetId={assetId}
                    openView={action as ListingStatusView}
                    onSelectitem={props.onSelectitem}
                />
            </ProtectedComponent>
        ),
        [action, assetId]
    );

    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={PlaceBidButton}
            MainComponent={List}
        />
    );
}

export default MerchantAssetsPage;
