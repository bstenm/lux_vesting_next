'use client';

import { BoxProps } from '@mui/material/Box';

import { Typography } from '@/components/Typography';

import { BlackBanner } from './BlackBanner';

type Props = BoxProps & {
    data?: string;
};

export function TitleBanner({ data, ...rest }: Props): JSX.Element {
    return (
        <BlackBanner {...rest}>
            {data ? (
                <Typography sx={{ color: 'primary.main' }} uppercased>
                    {data}
                </Typography>
            ) : (
                <Typography
                    sx={{ color: 'primary.main', fontStyle: 'italic' }}
                    textId="missingName"
                />
            )}
        </BlackBanner>
    );
}
