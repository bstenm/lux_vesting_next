'use client';

import { PlaceBid } from 'features/placeBid/PlaceBid';
import { AssetItem } from 'config/types/asset';
import { GreenButton } from 'components/buttons/GreenButton';
import { ButtonWithModal } from 'components/ButtonWithModal';

type Props = {
    data: AssetItem;
};

export function PlaceBidButton({ data }: Props): JSX.Element {
    return (
        <ButtonWithModal
            style={{ width: 300 }}
            fitContent
            button={(handleOpen) => (
                <GreenButton textId="bid" onClick={handleOpen} />
            )}>
            {(handleClose) => (
                <PlaceBid data={data} handleClose={handleClose} />
            )}
        </ButtonWithModal>
    );
}
