'use client';

import { RedButton } from '@/components/buttons/RedButton';
import { LightButton } from '@/components/buttons/LightButton';
import { GreenButton } from '@/components/buttons/GreenButton';
import { YellowButton } from '@/components/buttons/YellowButton';
import { RequestDenialModal } from '@/features/requestDenialNotes/RequestDenialNotesModal';
import { EditAssetListingDataModal } from '@/features/editAssetListingDataForm/EditAssetListingDataModal';
import { AssetItem, AssetListingStatus } from '@/config/types/asset';

import { ListingDataModal } from '../listingData/ListingDataModal';
import { CancelListingRequestModal } from './CancelListingRequestModal';

export type ListingStatusView =
    | 'none'
    | 'listingData'
    | 'denialNotes'
    | 'editAssetListingData'
    | 'cancelListingRequest';

type Props = {
    data: AssetItem;
    openView?: ListingStatusView;
};

export const ManageListingStatusButton = ({
    data,
    openView = 'none'
}: Props): JSX.Element => {
    const statusToElement: Record<AssetListingStatus, JSX.Element> = {
        pending: (
            <CancelListingRequestModal
                title={data.name}
                assetId={data.id}
                opened={openView === 'cancelListingRequest'}>
                {(open) => (
                    <YellowButton textId="listingRequested" onClick={open} />
                )}
            </CancelListingRequestModal>
        ),
        denied: (
            <RequestDenialModal
                title={data.name}
                notes={data.listing?.notes}
                opened={openView === 'denialNotes'}>
                {(open) => <RedButton textId="listingDenied" onClick={open} />}
            </RequestDenialModal>
        ),
        revoked: (
            <RequestDenialModal
                title={data.name}
                notes={data.listing?.notes}
                opened={openView === 'denialNotes'}>
                {(open) => <RedButton textId="listingRevoked" onClick={open} />}
            </RequestDenialModal>
        ),
        approved: (
            <ListingDataModal
                title={data.name}
                opened={openView === 'listingData'}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                {...data.listing!}>
                {(open) => <GreenButton textId="listed" onClick={open} />}
            </ListingDataModal>
        ),
        unprocessed: (
            <EditAssetListingDataModal
                assetId={data.id}
                opened={openView === 'editAssetListingData'}>
                {(open) => <LightButton textId="notListed" onClick={open} />}
            </EditAssetListingDataModal>
        )
    };

    return statusToElement[data.listing?.status ?? 'unprocessed'];
};
