'use client';

import { RedButton } from 'components/buttons/RedButton';
import { LightButton } from 'components/buttons/LightButton';
import { GreenButton } from 'components/buttons/GreenButton';
import { YellowButton } from 'components/buttons/YellowButton';
import { pickAssetListingData } from 'libs/utils';
import { RequestDenialModal } from 'features/requestDenialNotes/RequestDenialNotesModal';
import { EditAssetListingDataModal } from 'features/editAssetListingDataForm/EditAssetListingDataModal';
import { AssetItem, AssetListingStatus } from 'config/types/asset';

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
                notes={data.listingDenialNotes}
                opened={openView === 'denialNotes'}>
                {(open) => <RedButton textId="listingDenied" onClick={open} />}
            </RequestDenialModal>
        ),
        approved: (
            <ListingDataModal
                title={data.name}
                opened={openView === 'listingData'}
                {...pickAssetListingData(data)}>
                {(open) => <GreenButton textId="listed" onClick={open} />}
            </ListingDataModal>
        ),
        unprocessed: (
            <EditAssetListingDataModal
                assetId={data.id}
                opened={openView === 'editAssetListingData'}>
                {(open) => <LightButton textId="notListed" onClick={open} />}
            </EditAssetListingDataModal>
        ),
        purchased: <div />
    };

    return statusToElement[data.listing.status];
};