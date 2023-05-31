'use client';

import { grey } from '@mui/material/colors';
import capitalize from 'lodash/capitalize';
import { useTranslation } from 'react-i18next';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export function TextField(props: TextFieldProps): JSX.Element {
    const { t } = useTranslation();

    const { sx, label, placeholder, ...rest } = props;

    const labelTrans = label && capitalize(t(label as string));

    return (
        <MuiTextField
            sx={{
                '& label': {
                    color: grey[400]
                },
                '& .MuiInput-input': {
                    color: 'primary.light'
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'common.black'
                },
                '& .MuiInput-underline:before': {
                    borderBottomColor: 'primary.light'
                },
                ...sx
            }}
            label={labelTrans}
            variant="standard"
            placeholder={capitalize(t(placeholder as string))}
            {...rest}
        />
    );
}
