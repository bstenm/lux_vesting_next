'use client';

import { ButtonWithModal } from 'components/ButtonWithModal';

import { AssetAuthenticationRequestForm } from './AssetAuthenticationRequestForm';

type Props = {
    title: string;
    assetId: string;
    children: (handleClose: () => void) => React.ReactNode;
};

export function AssetAuthenticationRequestFormModal({
    title,
    assetId,
    children
}: Props): JSX.Element {
    return (
        <ButtonWithModal title={title} button={children}>
            {(handleClose) => (
                <AssetAuthenticationRequestForm
                    assetId={assetId}
                    onSuccess={handleClose}
                />
            )}
        </ButtonWithModal>
    );
}
