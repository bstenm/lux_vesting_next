'use client';

import { useCallback } from 'react';

import { AssetItem } from '@/config/types/asset';
import { AdminAssetList } from '@/features/adminAssetList/AdminAssetList';
import { ProtectedComponent } from '@/features/authButton/ProtectedComponent';
import { ComponentWithSelectedAssetInDrawer } from '@/layouts/ComponentWithSelectedAssetInDrawer';
import { AdminAssetListingStatusControlButtons } from '@/features/adminAssetList/adminAssetListing/AdminAssetListingStatusControlButtons';

type ListProps = {
    onSelectitem: (data: AssetItem) => void;
};

function AdminAssetsPage(): JSX.Element {
    const List = useCallback(
        (props: ListProps) => (
            <ProtectedComponent admin fullscreen>
                <AdminAssetList onSelectitem={props.onSelectitem} />
            </ProtectedComponent>
        ),
        []
    );

    return (
        <ComponentWithSelectedAssetInDrawer
            Actions={AdminAssetListingStatusControlButtons}
            MainComponent={List}
        />
    );
}

export default AdminAssetsPage;
