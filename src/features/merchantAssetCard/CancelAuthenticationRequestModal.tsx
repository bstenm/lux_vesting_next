'use client';

import { useUpdateAssetStatus } from '@/libs/hooks/useUpdateAssetStatus';

import { CancelRequestModal } from './CancelRequestModal';

type Props = {
    title: string;
    assetId: string;
    merchantId: string;
    children: (handleClose: () => void) => React.ReactNode;
};

export function CancelAuthenticationRequestModal({
    title,
    assetId,
    merchantId,
    children
}: Props): JSX.Element {
    const [updateAssetStatus, processing] = useUpdateAssetStatus(
        assetId,
        merchantId,
        'authentication'
    );

    const onConfirm = (): Promise<void> => updateAssetStatus('unprocessed');

    return (
        <CancelRequestModal
            title={title}
            textId="cancelAuthenticationProcessWarning"
            processing={processing}
            onConfirm={onConfirm}>
            {children}
        </CancelRequestModal>
    );
}
