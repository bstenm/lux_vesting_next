'use client';

import TextField from '@mui/material/TextField';
import { capitalize } from 'lodash';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { defaultCurrencySymbol } from 'config';

type NumericFormatCustomProps = {
    onChange: (event: { target: { value: string } }) => void;
    name: string;
};

const NumericFormatCustom = forwardRef<
    NumericFormatProps,
    NumericFormatCustomProps
>(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) =>
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }
            thousandSeparator
            valueIsNumericString
            prefix={`${defaultCurrencySymbol} `}
        />
    );
});

type Props = {
    onChange: (value: string) => void;
};

export function BidInput({ onChange }: Props): JSX.Element {
    const [value, setValue] = useState<string>();

    const { t } = useTranslation();

    return (
        <TextField
            sx={{
                '& .MuiInput-input': {
                    textAlign: value ? 'center' : 'left'
                }
            }}
            autoFocus
            onChange={(e) => {
                onChange(e.target?.value ?? '');
                setValue(e.target?.value);
            }}
            InputProps={{
                disableUnderline: true,
                sx: {
                    width: 140,
                    color: 'common.white',
                    fontSize: 22,
                    textAlign: 'center',
                    borderColor: 'purple'
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumericFormatCustom as any
            }}
            variant="standard"
            placeholder={capitalize(t('enterBid'))}
        />
    );
}
// Write an text input with the material ui with a white border
