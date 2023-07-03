'use client';

import { capitalize } from 'lodash';
import { useTranslate } from '@/libs/hooks/useTranslate';
import MuiFormHelperText from '@mui/material/FormHelperText';

type Props = React.ComponentProps<typeof MuiFormHelperText> & {
    textId: string;
};

export function FormHelperText({ textId, ...other }: Props): JSX.Element {
    const t = useTranslate();

    return (
        <MuiFormHelperText
            sx={{
                color: 'secondary.main',
                fontSize: 14
            }}
            {...other}>
            {capitalize(t(textId ?? 'unexpectedError'))}
        </MuiFormHelperText>
    );
}
