'use client';

import { ButtonWithModal } from '@/components/ButtonWithModal';

import { AssetItem } from '@/config/types/asset';
import { AdminAssetAuthenticationStatusControl } from './AdminAssetAuthenticationStatusControl';

type Props = {
    data: AssetItem;
    children: (handleClose: () => void) => React.ReactNode;
};

export function AdminAssetAuthenticationStatusControlModal({
    data,
    children
}: Props): JSX.Element {
    return (
        <ButtonWithModal
            fitContent
            title={data.name}
            style={{ padding: '20px 40px' }}
            button={children}>
            {(handleClose) => (
                <AdminAssetAuthenticationStatusControl
                    data={data}
                    handleClose={handleClose}
                />
            )}
        </ButtonWithModal>
    );
}
