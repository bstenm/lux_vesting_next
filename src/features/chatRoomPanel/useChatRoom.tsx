'use client';

import { useState } from 'react';

import { MessageItem } from '@/config/types';

import { useFetchChat } from './useFetchChat';
import { useSendMessage } from './useSendMessage';

type HookLogic = {
    text: string;
    send: () => void;
    fetching: boolean;
    messages: MessageItem[] | undefined;
    submitting: boolean;
    handleTextChange: (value: string) => void;
};

export const useChatRoom = (
    to: string,
    from: string,
    assetId: string
): HookLogic => {
    const [text, setText] = useState<string>('');

    const [messages, fetching] = useFetchChat(to, from, assetId);

    const [sendMessage, submitting] = useSendMessage(to, assetId);

    const handleTextChange = (value: string): void => {
        setText(value);
    };

    const send = async (): Promise<void> => {
        sendMessage({ text });
        setText('');
    };

    return {
        text,
        send,
        fetching,
        messages,
        submitting,
        handleTextChange
    };
};
