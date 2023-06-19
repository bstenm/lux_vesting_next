'use client';

import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import { ChangeEvent } from 'react';
import MuiFormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { defaultCurrencySymbol } from 'config';

type Props = {
    amount?: number;
    disabled: boolean;
    onChange(value: number): void;
};

const FormControl = styled(MuiFormControl)`
    width: 100px;
`;

const Input = styled(MuiInput)(
    ({ theme }) => `
    color: ${theme.palette.common.white};
    font-size: 24px;
`
);

const Symbol = styled('span')(
    ({ theme }) => `
    color: ${theme.palette.common.white};
`
);

export function AmountInput({
    amount,
    onChange,
    disabled
}: Props): JSX.Element {
    return (
        <FormControl variant="outlined">
            <Input
                type="number"
                autoFocus
                sx={{ pb: 1 }}
                value={amount?.toString()}
                disabled={disabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange(parseInt(e.target.value, 10));
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Symbol>{defaultCurrencySymbol}</Symbol>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
