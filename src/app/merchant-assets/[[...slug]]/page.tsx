'use client';

import { useParams } from 'next/navigation';

import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { MerchantAssetList } from 'features/merchantAssetList/MerchantAssetList';
import { FloatingAddButton } from 'components/FloatingAddButton';
import { AddNewAssetModal } from 'features/addNewAssetModal/AddNewAssetModal';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';
import { ListingStatusView } from 'features/merchantAssetCard/ManageListingStatusButton';
import { useCallback } from 'react';
import { AssetItem } from 'config/types/asset';

function MerchantAssetsPage(): JSX.Element {
    const { slug } = useParams() as { slug?: string[] };

    const [action, assetId] = slug ?? [];

    const List = useCallback(
        (onSelectitem: (data: AssetItem) => void) => (
            <MerchantAssetList
                assetId={assetId}
                openView={action as ListingStatusView}
                onSelectitem={onSelectitem}
            />
        ),
        [action, assetId]
    );

    return (
        <>
            <ComponentWithSelectedAssetInDrawer
                Actions={PlaceBidButton}
                MainComponent={List}
            />
            <AddNewAssetModal openOnLoad={action === 'addNewAsset'}>
                {(handleOpenModal) => (
                    <FloatingAddButton onClick={handleOpenModal} />
                )}
            </AddNewAssetModal>
        </>
    );
}

export default MerchantAssetsPage;
