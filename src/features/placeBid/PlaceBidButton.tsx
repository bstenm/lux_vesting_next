'use client';

import { useCallback } from 'react';

import { PlaceBid } from '@/features/placeBid/PlaceBid';
import { AssetItem } from '@/config/types/asset';
import { GreenButton } from '@/components/buttons/GreenButton';
import { ButtonWithModal } from '@/components/ButtonWithModal';
import { ProtectedComponent } from '@/features/authButton/ProtectedComponent';

type Props = {
    data: AssetItem;
};

export function PlaceBidButton({ data }: Props): JSX.Element {
    const OpenModalButton = useCallback(
        (handleOpen: () => void) => (
            <GreenButton textId="bid" onClick={handleOpen} />
        ),
        []
    );

    return (
        <ButtonWithModal
            style={{ width: 300 }}
            button={OpenModalButton}
            fitContent>
            {(handleClose) => (
                <ProtectedComponent action="placeBid">
                    <PlaceBid data={data} handleClose={handleClose} />
                </ProtectedComponent>
            )}
        </ButtonWithModal>
    );
}
