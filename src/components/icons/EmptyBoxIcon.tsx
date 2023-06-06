'use client';

import { useTheme } from '@mui/material/styles';
import { GrDropbox } from 'react-icons/gr';

type Props = {
    size?: number;
};

export function EmptyBoxIcon({ size }: Props): JSX.Element {
    const theme = useTheme();

    return <GrDropbox size={size ?? 30} color={theme.palette.primary.light} />;
}
