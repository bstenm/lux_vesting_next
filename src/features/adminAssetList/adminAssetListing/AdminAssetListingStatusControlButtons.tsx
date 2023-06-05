'use client';

import { Row } from 'components/Row';
import { RedButton } from 'components/buttons/RedButton';
import { GreenButton } from 'components/buttons/GreenButton';
import { ListingDataModal } from 'features/listingData/ListingDataModal';
import { useUpdateAssetStatus } from 'libs/hooks/useUpdateAssetStatus';
import { DenialNotesModalButton } from 'features/denialNotes/DenialNotesModalButton';
import { AssetItem, AssetListingStatus } from 'config/types/asset';

import { DenyButton } from '../DenyButton';
import { useApproveAssetListing } from './useApproveAssetListing';

type Props = {
    data: AssetItem;
    handleClose: () => void;
};

type Status = Exclude<AssetListingStatus, 'unprocessed'>;

export const AdminAssetListingStatusControlButtons = ({
    data,
    handleClose
}: Props): JSX.Element => {
    const [onApprove, approving] = useApproveAssetListing(data, handleClose);

    const { id, merchantId, listing } = data;

    const [onUpdateStatus, updating] = useUpdateAssetStatus(
        id,
        merchantId,
        'listing',
        {
            onSuccess: handleClose
        }
    );

    const actionButton: Record<Status, JSX.Element> = {
        revoked: (
            <GreenButton
                textId="listAgain"
                onClick={onApprove}
                loading={approving}
                fullWidth
                withBorder
            />
        ),
        approved: (
            <Row spacing={3}>
                <RedButton
                    textId="delist"
                    onClick={() => onUpdateStatus('revoked')}
                    loading={updating}
                    fullWidth
                    withBorder
                />
                <ListingDataModal
                    title={data.name}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    {...data.listing!}>
                    {(open) => (
                        <GreenButton
                            textId="listingData"
                            onClick={open}
                            disabled={updating}
                            fullWidth
                            withBorder
                        />
                    )}
                </ListingDataModal>
            </Row>
        ),
        denied: (
            <Row spacing={3}>
                <DenialNotesModalButton
                    title={data.name}
                    data={data.listing?.notes}
                    disabled={approving}
                />
                <GreenButton
                    fullWidth
                    withBorder
                    textId="approve"
                    onClick={onApprove}
                    loading={approving}
                />
            </Row>
        ),
        pending: (
            <Row spacing={3}>
                <DenyButton
                    onDone={(notes) => onUpdateStatus('denied', notes)}
                />
                <GreenButton
                    textId="approve"
                    onClick={onApprove}
                    loading={approving}
                    fullWidth
                    withBorder
                />
            </Row>
        )
    };

    return actionButton[listing?.status as Status];
};
