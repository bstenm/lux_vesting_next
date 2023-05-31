'use client';

import { useState } from 'react';

import { getUserId } from 'state/user/selectors';
import { AssetItem } from 'config/types/asset';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { ChatRoomPanel } from 'features/chatRoomPanel/ChatRoomPanel';
import { ModalForbidden } from 'components/ModalForbidden';
import { CommentIconButton } from 'components/iconButtons/CommentIconButton';

type Props = {
    to: string;
    title?: string;
    asset: AssetItem;
};

export function SendMessageButton({ to, title, asset }: Props): JSX.Element {
    const uid = useAppSelector(getUserId);

    const [openChat, setOpenChat] = useState<boolean>(false);

    const handleCloseChat = (): void => {
        setOpenChat(false);
    };

    const handleOpenChat = (): void => {
        setOpenChat(true);
    };

    return (
        <>
            <CommentIconButton
                title={title ?? 'messageMerchant'}
                onClick={handleOpenChat}
            />
            {(openChat && to === uid && (
                <ModalForbidden
                    textId="noChatWithYourself"
                    onConfirm={handleCloseChat}
                />
            )) ||
                (openChat && (
                    <ChatRoomPanel
                        to={to}
                        from={uid}
                        open={openChat}
                        asset={asset}
                        onClose={handleCloseChat}
                    />
                ))}
        </>
    );
}
