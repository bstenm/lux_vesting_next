'use client';

import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useTranslate } from '@/libs/hooks/useTranslate';

type Props = {
    message: string;
};

export function MissingData({ message }: Props): JSX.Element {
    const t = useTranslate();

    return (
        <Typography variant="body2" color={grey[400]}>
            <i> {t(message)}</i>
        </Typography>
    );
}
