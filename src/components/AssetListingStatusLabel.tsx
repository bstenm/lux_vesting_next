'use client';

import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';

import { AssetListingStatus } from 'config/types/asset';

import { RedButton } from './buttons/RedButton';
import { DarkButton } from './buttons/DarkButton';
import { LightButton } from './buttons/LightButton';
import { YellowButton } from './buttons/YellowButton';

type Props = React.ComponentProps<typeof MuiButton> & {
    status: AssetListingStatus;
    fullWidth?: boolean;
};

const statusToButton = (
    fullWidth?: boolean
): Record<AssetListingStatus, JSX.Element> => ({
    denied: <RedButton fullWidth={fullWidth} textId="denied" />,
    pending: <YellowButton fullWidth={fullWidth} textId="pending" />,
    revoked: <RedButton fullWidth={fullWidth} textId="revoked" />,
    approved: <DarkButton fullWidth={fullWidth} textId="listed" />,
    unprocessed: <LightButton fullWidth={fullWidth} textId="notListed" />
});

export function AssetListingStatusLabel({
    status,
    fullWidth
}: Props): JSX.Element {
    return statusToButton(fullWidth)[status] ?? <Box />;
}
