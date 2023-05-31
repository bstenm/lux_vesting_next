'use client';

import { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

import { BrokenImagePlaceholder } from 'components/BrokenImagePlaceholder';
import { useTranslation } from 'react-i18next';

type Props = BoxProps & {
    uri?: string;
    alt: string;
    size?: number;
};

export function Image({
    sx,
    uri,
    alt,
    size,
    width,
    height,
    ...other
}: Props): JSX.Element {
    const { t } = useTranslation();

    const [brokenImage, setBrokenImage] = useState<boolean>(false);

    return brokenImage ? (
        <BrokenImagePlaceholder />
    ) : (
        <Box
            alt={t(alt)}
            src={uri}
            onError={() => setBrokenImage(true)}
            component="img"
            sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 1,
                width: size ?? width,
                height: size ?? height,
                ...sx
            }}
            {...other}
        />
    );
}
