'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { GrDropbox } from 'react-icons/gr';

import { Row } from 'components/Row';
import { Centered } from 'components/Centered';
import { Typography } from 'components/Typography';

type Props = React.ComponentProps<typeof Box> & {
    noIcon?: boolean;
    message?: string;
    fullscreen?: boolean;
    noMessage?: boolean;
};

export function EmptyResponse({
    noIcon,
    message,
    fullscreen,
    noMessage = true,
    ...other
}: Props): JSX.Element {
    const theme = useTheme();

    return (
        <Centered fullscreen={fullscreen} {...other}>
            <Row spacing={2}>
                {!noIcon && (
                    <GrDropbox size={50} color={theme.palette.primary.light} />
                )}
                {!noMessage && (
                    <Typography
                        capitalized
                        variant="h5"
                        textId={message ?? 'nothingFound'}
                        color="primary.light"
                    />
                )}
            </Row>
        </Centered>
    );
}
