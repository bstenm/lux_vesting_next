'use client';

import { Marketplace } from 'features/marketplace/Marketplace';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';

function Page(): JSX.Element {
    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={PlaceBidButton}
            MainComponent={Marketplace}
        />
    );
}

const path = '/marketplace';

export const marketplace = { path, page: Page };
