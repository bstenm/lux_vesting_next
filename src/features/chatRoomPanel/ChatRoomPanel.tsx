'use client';

import { Box, Stack } from '@mui/material';

import { Row } from 'components/Row';
import { AssetItem } from 'config/types/asset';
import { StandardDrawer } from 'components/StandardDrawer';

import { FetchingScreen } from 'components/FetchingScreen';
import { useChatRoom } from './useChatRoom';
import { ChatRoomInput } from './ChatRoomInput';
import { ChatRoomMessage } from './ChatRoomMessage';
import { ChatRoomPanelSlider } from './ChatRoomPanelSlider';
import { ChatRoomSubmitButton } from './ChatRoomSubmitButton';
import { ChatRoomAssetOverview } from './ChatRoomAssetOverview';

type Props = {
    to: string;
    from: string;
    open: boolean;
    asset: AssetItem;
    onClose: () => void;
};

export function ChatRoomPanel({
    to,
    from,
    open,
    asset,
    onClose
}: Props): JSX.Element {
    const { text, send, fetching, messages, submitting, handleTextChange } =
        useChatRoom(to, from, asset.id, asset.name);

    return (
        <StandardDrawer open={open} onClose={onClose}>
            <ChatRoomPanelSlider>
                <ChatRoomAssetOverview asset={asset} />
            </ChatRoomPanelSlider>
            <Box sx={{ width: 320 }}>
                <FetchingScreen
                    fetching={fetching}
                    data={messages}
                    message="startConversation">
                    {(data) => (
                        <Stack sx={{ mt: 3, mb: 6 }} spacing={2}>
                            {data.map((message) => (
                                <ChatRoomMessage
                                    key={message.createdAt}
                                    data={message}
                                    thisUser={message.from === from}
                                />
                            ))}
                        </Stack>
                    )}
                </FetchingScreen>
                <Row
                    sx={{
                        p: 1,
                        right: 0,
                        width: 360,
                        bottom: 0,
                        bgcolor: 'common.black',
                        position: 'fixed'
                    }}
                    justifyContent="center"
                    spacing={3}>
                    <ChatRoomInput text={text} onChange={handleTextChange} />
                    <ChatRoomSubmitButton
                        submit={send}
                        submitting={submitting}
                    />
                </Row>
            </Box>
        </StandardDrawer>
    );
}
