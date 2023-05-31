'use client';

import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { DatabaseService } from 'services/DatabaseService';
import { HookActionError } from 'libs/customErrors';
import { useSendNotifications } from 'features/notifications/useSendNotifications';
import { getUserId, getUserName } from 'state/user/selectors';
import { Message, NotificationType } from 'config/types';

type StateLogic = [({ text }: Args) => void, boolean];

type Args = { text: string };

export const useSendMessage = (
    to: string,
    assetId: string,
    assetName: string
): StateLogic => {
    const from = useAppSelector(getUserId);

    const userName = useAppSelector(getUserName);

    const [sendNotifications] = useSendNotifications({
        silent: true
    });

    const action = async ({ text }: Args): Promise<void> => {
        if (to === from) {
            throw new HookActionError('noChatWithYourself');
        }
        const record: Message = { to, from, text };
        await DatabaseService.addMessage(assetId, record);
        const type: NotificationType = `newMessage`;
        const data = { type, from: userName, assetId, assetName };
        sendNotifications({ to: [to], data });
    };

    const [sendMessage, submitting] = useAsyncAction<Args, void>(action, {
        error: 'errorSendingMessage'
    });

    return [sendMessage, submitting];
};
