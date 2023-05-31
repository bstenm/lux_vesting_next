'use client';

import { EditIconButton } from 'components/iconButtons/EditIconButton';

import { EditAssetListingDataModal } from './EditAssetListingDataModal';

type Props = {
    assetId: string;
};

export function EditAssetDataIconButton({ assetId }: Props): JSX.Element {
    return (
        <EditAssetListingDataModal assetId={assetId}>
            {(handleOpen) => (
                <EditIconButton title="editInfo" onClick={handleOpen} />
            )}
        </EditAssetListingDataModal>
    );
}
