'use client';

import Box from '@mui/material/Box';

export function Space({
    sx,
    width,
    height
}: {
    sx?: Record<string, unknown>;
    width?: string | number;
    height?: string | number;
}): JSX.Element {
    return <Box sx={sx ?? { width, height }} />;
}
