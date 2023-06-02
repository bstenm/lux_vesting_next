'use client';

import { useParams } from 'next/navigation';

import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { MerchantAssetList } from 'features/merchantAssetList/MerchantAssetList';
import { FloatingAddButton } from 'components/FloatingAddButton';
import { AddNewAssetModal } from 'features/addNewAssetModal/AddNewAssetModal';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';
import { ListingStatusView } from 'features/merchantAssetCard/ManageListingStatusButton';

function Page(): JSX.Element {
    const { slug } = useParams() as { slug?: string[] };

    const [action, assetId] = slug ?? [];

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

export default Page;
