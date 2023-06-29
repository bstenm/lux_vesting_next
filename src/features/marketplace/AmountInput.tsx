'use client';

import TextField from '@mui/material/TextField';
import { capitalize } from 'lodash';
import { ChangeEvent } from 'react';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { CustomNumericFormat } from '@/components/CustomNumericFormat';

type Props = {
    label: string;
    input?: string;
    onChange: (args: ChangeEvent<HTMLInputElement>) => void;
};

export function AmountInput({ label, input, onChange }: Props): JSX.Element {
    const t = useTranslate();

    return (
        <TextField
            value={input}
            onChange={onChange}
            placeholder={capitalize(t(label))}
            InputProps={{
                sx: {
                    fontSize: 14,
                    color: '#CCC',
                    width: 80,
                    '& .MuiOutlinedInput-input': {
                        p: 1
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: CustomNumericFormat as any
            }}
        />
    );
}
