'use client';

import { Box } from '@mui/material';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { Message } from 'config/types';

type Props = {
    data: Message;
    thisUser: boolean;
};

export function ChatRoomMessage({ data, thisUser }: Props): JSX.Element {
    return (
        <Row justifyContent={thisUser ? 'left' : 'right'}>
            <Box
                sx={{
                    p: 1,
                    bgcolor: thisUser ? 'primary.dark' : 'primary.light',
                    maxWidth: '80%',
                    borderRadius: 2
                }}>
                <Typography
                    sx={{
                        color: thisUser ? 'common.white' : 'common.black'
                    }}>
                    {data.text}
                </Typography>
            </Box>
        </Row>
    );
}
