'use client';

import { ButtonWithModal } from 'components/ButtonWithModal';
import { EditAssetListingDataForm } from './EditAssetListingDataForm';

type Props = {
    assetId: string;
    opened?: boolean;
    children: (handleClose: () => void) => React.ReactNode;
};

export function EditAssetListingDataModal({
    assetId,
    opened,
    children
}: Props): JSX.Element {
    return (
        <ButtonWithModal button={children} opened={opened}>
            {(handleClose) => (
                <EditAssetListingDataForm
                    assetId={assetId}
                    onSuccess={handleClose}
                />
            )}
        </ButtonWithModal>
    );
}
