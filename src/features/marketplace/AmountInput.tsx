'use client';

import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import { capitalize } from 'lodash';

import { useTranslate } from 'libs/hooks/useTranslate';
import { CustomNumericFormat } from 'components/CustomNumericFormat';

type Props = {
    label: string;
    onChange: (value?: number) => void;
};

export function AmountInput({ label, onChange }: Props): JSX.Element {
    const [input, setInput] = useState<string>();

    const t = useTranslate();

    const onChangeValue = ({
        target: { value }
    }: ChangeEvent<HTMLInputElement>): void => {
        const valueAsNb = value ? parseInt(value, 10) : undefined;
        setInput(value);
        onChange(valueAsNb);
    };

    return (
        <TextField
            value={input}
            onChange={onChangeValue}
            placeholder={capitalize(t(label))}
            InputProps={{
                sx: (theme) => ({
                    width: 80,
                    ...theme.filter,
                    '& .MuiOutlinedInput-input': {
                        p: 1
                    }
                }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: CustomNumericFormat as any
            }}
        />
    );
}
