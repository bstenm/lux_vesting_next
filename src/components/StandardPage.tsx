'use client';

import Stack from '@mui/material/Stack';

import { BoxGradient } from './BoxGradient';
import { StandardPageTitle } from './StandardPageTitle';
import { StandardPageSubtitle } from './StandardPageSubtitle';

type Props = React.ComponentProps<typeof Stack> & {
    sx?: Record<string, unknown>;
    titleId: string;
    noBox?: boolean;
    children: React.ReactNode;
    subtitle?: React.ReactNode;
    subtitleId?: string;
};

export function StandardPage({
    sx,
    titleId,
    noBox,
    subtitle,
    children,
    subtitleId,
    ...other
}: Props): JSX.Element {
    return (
        <Stack
            {...other}
            sx={{
                mx: 'auto',
                width: { xs: '95%', md: '75%' },
                textAlign: 'center',
                ...sx
            }}
            spacing={3}>
            <StandardPageTitle textId={titleId} />
            {subtitle && (
                <StandardPageSubtitle>{subtitle}</StandardPageSubtitle>
            )}
            {subtitleId && <StandardPageSubtitle textId={subtitleId} />}
            {noBox ? (
                children
            ) : (
                <BoxGradient spacing={4}>{children}</BoxGradient>
            )}
        </Stack>
    );
}
