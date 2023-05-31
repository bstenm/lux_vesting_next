'use client';

import { useTheme } from '@mui/material';
import LibBounceLoader from 'react-spinners/BounceLoader';

type Props = {
    size?: number;
    color?: string;
};

export function BounceLoader({ size, color }: Props): JSX.Element {
    const theme = useTheme();

    return (
        <LibBounceLoader
            color={color ?? theme.palette.primary.light}
            loading
            size={size ?? 50}
        />
    );
}
