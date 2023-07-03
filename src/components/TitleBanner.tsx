'use client';

import { BoxProps } from '@mui/material/Box';

import { Typography } from '@/components/Typography';

import { BlackBanner } from './BlackBanner';

type Props = BoxProps & {
    data?: string;
    textId?: string;
};

export function TitleBanner({ data, textId, ...rest }: Props): JSX.Element {
    return (
        <BlackBanner {...rest}>
            {data && (
                <Typography sx={{ color: 'primary.main' }} uppercased>
                    {data}
                </Typography>
            )}
            {!data && textId && (
                <Typography
                    sx={{ color: 'primary.main', fontStyle: 'italic' }}
                    textId={textId}
                    uppercased
                />
            )}
            {!data && !textId && (
                <Typography
                    sx={{ color: 'primary.main', fontStyle: 'italic' }}
                    textId="missingName"
                    allCapitalized
                />
            )}
        </BlackBanner>
    );
}
