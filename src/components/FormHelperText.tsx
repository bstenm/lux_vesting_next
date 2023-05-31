'use client';

import { pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MuiFormHelperText from '@mui/material/FormHelperText';

type Props = React.ComponentProps<typeof MuiFormHelperText> & {
    textId: string;
};

const Component = styled(MuiFormHelperText)({
    color: pink[500],
    fontWeight: 'bold',
    fontSize: 14
});

export function FormHelperText({ textId, ...other }: Props): JSX.Element {
    const { t } = useTranslation();

    return <Component {...other}>{t(textId ?? 'unexpectedError')}</Component>;
}
