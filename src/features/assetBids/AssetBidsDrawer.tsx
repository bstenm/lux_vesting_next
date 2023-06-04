'use client';

import { AssetItem } from 'config/types/asset';
import { ChatRoomPanel } from 'features/chatRoomPanel/ChatRoomPanel';
import { StandardDrawer } from 'components/StandardDrawer';
import { ModalForbidden } from 'components/ModalForbidden';

import { AssetBidsPanel } from './AssetBidsPanel';
import { useAssetBidsDrawer } from './useAssetBidsDrawer';

type Props = {
    open: boolean;
    asset: AssetItem;
    handleClose: () => void;
};

export function AssetBidsDrawer({
    open,
    asset,
    handleClose
}: Props): JSX.Element {
    const { userId, clientId, handleOpenChat, handleCloseChat } =
        useAssetBidsDrawer();

    if (clientId && userId !== clientId) {
        return (
            <ChatRoomPanel
                to={clientId}
                from={userId}
                asset={asset}
                open={!!clientId}
                onClose={handleCloseChat}
            />
        );
    }

    return (
        <StandardDrawer open={open} onClose={handleClose}>
            <AssetBidsPanel
                assetId={asset.id}
                handleOpenChat={handleOpenChat}
            />
            {userId === clientId && (
                <ModalForbidden
                    textId="noChatWithYourself"
                    onConfirm={handleClose}
                />
            )}
        </StandardDrawer>
    );
}
