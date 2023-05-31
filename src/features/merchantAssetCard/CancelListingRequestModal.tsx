'use client';

import { useUpdateAssetData } from 'libs/hooks/useUpdateAssetData';

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
    const [updateAssetData, processing] = useUpdateAssetData(assetId);

    const onConfirm = (): Promise<void> =>
        updateAssetData({ listing: { status: 'unprocessed' } });

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
