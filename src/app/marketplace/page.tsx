'use client';

import { Marketplace } from 'features/marketplace/Marketplace';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { ComponentWithSelectedAssetInDrawer } from 'layouts/ComponentWithSelectedAssetInDrawer';

function MarketplacePage(): JSX.Element {
    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={PlaceBidButton}
            MainComponent={Marketplace}
        />
    );
}

export default MarketplacePage;
