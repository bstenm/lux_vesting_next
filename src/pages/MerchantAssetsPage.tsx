'use client';

import { useParams } from 'next/link';

import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { MerchantAssetList } from 'features/merchantAssetList/MerchantAssetList';
import { FloatingAddButton } from 'components/FloatingAddButton';
import { AddNewAssetModal } from 'features/addNewAssetModal/AddNewAssetModal';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';
import { ListingStatusView } from 'features/merchantAssetCard/ManageListingStatusButton';

function Page(): JSX.Element {
    const { action, assetId } = useParams<{
        action?: string;
        assetId?: string;
    }>();

    return (
        <>
            <ComponentWithSelectedAssetInDrawer
                Actions={PlaceBidButton}
                MainComponent={(onSelectitem) => (
                    <MerchantAssetList
                        assetId={assetId}
                        openView={action as ListingStatusView}
                        onSelectitem={onSelectitem}
                    />
                )}
            />
            <AddNewAssetModal openOnLoad={action === 'addNewAsset'}>
                {(handleOpenModal) => (
                    <FloatingAddButton onClick={handleOpenModal} />
                )}
            </AddNewAssetModal>
        </>
    );
}

const route = 'merchant-assets';

const path = `/${route}`;

export const merchantAssets = { path, route, page: Page };
