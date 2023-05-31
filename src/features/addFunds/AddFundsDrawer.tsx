'use client';

import { AddFundsPanel } from 'features/addFunds/AddFundsPanel';
import { StandardDrawer } from 'components/StandardDrawer';

import { useAddFundsDrawer } from './useAddFundsDrawer';

export function AddFundsDrawer(): JSX.Element {
    const { close, opened } = useAddFundsDrawer();

    return (
        <StandardDrawer open={opened} onClose={close}>
            <AddFundsPanel handleClose={close} />
        </StandardDrawer>
    );
}
