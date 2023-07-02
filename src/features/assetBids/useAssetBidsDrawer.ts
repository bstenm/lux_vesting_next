'use client';

import { useState } from 'react';

import { getUserId } from '@/state/user/selectors';
import { useAppSelector } from '@/libs/hooks/useAppSelector';

type HookLogic = {
    userId: string;
    clientId?: string;
    handleCloseChat: () => void;
    handleOpenChat: (id: string) => void;
};

export const useAssetBidsDrawer = (): HookLogic => {
    const userId = useAppSelector(getUserId);

    const [clientId, setClientId] = useState<string>('');

    const handleOpenChat = (id: string): void => {
        setClientId(id);
    };

    const handleCloseChat = (): void => {
        setClientId('');
    };

    return {
        userId,
        clientId,
        handleOpenChat,
        handleCloseChat
    };
};
