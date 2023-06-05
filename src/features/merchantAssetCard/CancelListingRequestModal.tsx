'use client';

import { useUpdateAssetStatus } from 'libs/hooks/useUpdateAssetStatus';

import { useAppSelector } from 'libs/hooks/useAppSelector';
import { getUserId } from 'state/user/selectors';
import { CancelRequestModal } from './CancelRequestModal';

type Props = {
    title: string;
    assetId: string;
    opened?: boolean;
    children: (handleClose: () => void) => React.ReactNode;
};

export function CancelListingRequestModal({
    title,
    assetId,
    opened,
    children
}: Props): JSX.Element {
    const merchantId = useAppSelector(getUserId);

    const [updateAssetStatus, processing] = useUpdateAssetStatus(
        assetId,
        merchantId,
        'listing'
    );

    const onConfirm = (): Promise<void> => updateAssetStatus('unprocessed');

    return (
        <CancelRequestModal
            title={title}
            textId="cancelListingRequestWarning"
            opened={opened}
            processing={processing}
            onConfirm={onConfirm}>
            {children}
        </CancelRequestModal>
    );
}
