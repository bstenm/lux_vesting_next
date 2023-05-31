'use client';

import { AdminAssetList } from 'features/adminAssetList/AdminAssetList';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';
import { AdminAssetListingStatusControlButtons } from 'features/adminAssetList/adminAssetListing/AdminAssetListingStatusControlButtons';

function Page(): JSX.Element {
    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={AdminAssetListingStatusControlButtons}
            MainComponent={AdminAssetList}
        />
    );
}

const path = '/admin/asset-list';

export const adminAssetList = { path, page: Page };
