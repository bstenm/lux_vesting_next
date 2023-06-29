'use client';

import { DarkButton } from '@/components/buttons/DarkButton';

import { useAddFundsDrawer } from './useAddFundsDrawer';

export function AddFundsButton(): JSX.Element {
    const { open } = useAddFundsDrawer();

    return <DarkButton textId="addFunds" onClick={() => open('addFunds')} />;
}
