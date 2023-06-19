'use client';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { capitalize } from 'lodash';

import { useTranslate } from 'libs/hooks/useTranslate';
import { CustomNumericFormat } from 'components/CustomNumericFormat';

type Props = {
    onChange: (value: string) => void;
};

export function BidInput({ onChange }: Props): JSX.Element {
    const [value, setValue] = useState<string>();

    const t = useTranslate();

    return (
        <TextField
            sx={{
                '& .MuiInput-input': {
                    textAlign: value ? 'center' : 'left'
                }
            }}
            autoFocus
            onChange={(e) => {
                setValue(e.target?.value);
                onChange(e.target?.value ?? '');
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
                inputComponent: CustomNumericFormat as any
            }}
            variant="standard"
            placeholder={capitalize(t('enterBid'))}
        />
    );
}
