'use client';

import { AdminAssetList } from 'features/adminAssetList/AdminAssetList';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';
import { AdminAssetListingStatusControlButtons } from 'features/adminAssetList/adminAssetListing/AdminAssetListingStatusControlButtons';

function AdminAssetsPage(): JSX.Element {
    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={AdminAssetListingStatusControlButtons}
            MainComponent={AdminAssetList}
        />
    );
}

export default AdminAssetsPage;
