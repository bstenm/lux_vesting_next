'use client';

import { useTheme } from '@mui/material/styles';
import LibBounceLoader from 'react-spinners/BounceLoader';

type Props = {
    size?: number;
    color?: string;
};

export function BounceLoader({ size, color }: Props): JSX.Element {
    const theme = useTheme();

    return (
        <LibBounceLoader
            color={color ?? theme.palette.primary.main}
            loading
            size={size ?? 50}
        />
    );
}
