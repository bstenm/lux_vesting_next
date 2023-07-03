'use client';

import { useTheme } from '@mui/material/styles';
import LibPuffLoader from 'react-spinners/PuffLoader';

type Props = {
    size?: number;
    color?: string;
};

export function PuffLoader({ size, color }: Props): JSX.Element {
    const theme = useTheme();

    return (
        <LibPuffLoader
            color={color ?? theme.palette.primary.dark}
            loading
            size={size ?? 30}
        />
    );
}
