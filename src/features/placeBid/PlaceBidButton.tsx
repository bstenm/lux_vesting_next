'use client';

import { PlaceBid } from 'features/placeBid/PlaceBid';
import { AssetItem } from 'config/types/asset';
import { GreenButton } from 'components/buttons/GreenButton';
import { ButtonWithModal } from 'components/ButtonWithModal';
import { useCallback } from 'react';

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
                <PlaceBid data={data} handleClose={handleClose} />
            )}
        </ButtonWithModal>
    );
}
