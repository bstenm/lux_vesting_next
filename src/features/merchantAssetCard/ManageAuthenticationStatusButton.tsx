'use client';

import { RedButton } from 'components/buttons/RedButton';
import { Typography } from 'components/Typography';
import { LightButton } from 'components/buttons/LightButton';
import { BlackBanner } from 'components/BlackBanner';
import { YellowButton } from 'components/buttons/YellowButton';
import { RequestDenialModal } from 'features/requestDenialNotes/RequestDenialNotesModal';
import { AssetItem, AssetAuthenticationStatus } from 'config/types/asset';
import { AssetAuthenticationRequestFormModal } from 'features/assetAuthenticationRequestForm/AssetAuthenticationRequestFormModal';

import { CancelAuthenticationRequestModal } from './CancelAuthenticationRequestModal';

type Props = {
    data: AssetItem;
};

export const ManageAuthenticationStatusButton = ({
    data
}: Props): JSX.Element => {
    const statusToElement: Record<AssetAuthenticationStatus, JSX.Element> = {
        pending: (
            <CancelAuthenticationRequestModal
                title={data.name}
                assetId={data.id}
                merchantId={data.merchantId}>
                {(open) => (
                    <YellowButton textId="authRequested" onClick={open} />
                )}
            </CancelAuthenticationRequestModal>
        ),
        denied: (
            <RequestDenialModal
                title={data.name}
                notes={data.authentication.notes}>
                {(open) => <RedButton textId="authDenied" onClick={open} />}
            </RequestDenialModal>
        ),
        approved: (
            <BlackBanner>
                <Typography
                    uppercased
                    sx={{ color: 'success.main' }}
                    textId="authenticated"
                    variant="body2"
                />
            </BlackBanner>
        ),
        unprocessed: (
            <AssetAuthenticationRequestFormModal
                title={data.name}
                assetId={data.id}>
                {(open) => (
                    <LightButton textId="unauthenticated" onClick={open} />
                )}
            </AssetAuthenticationRequestFormModal>
        )
    };

    return statusToElement[data.authentication.status];
};
