'use client';

import startCase from 'lodash/startCase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext, Path } from 'react-hook-form';
import { HTMLInputTypeAttribute, forwardRef } from 'react';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { FormHelperText } from '@/components/FormHelperText';
import { CustomNumericFormat } from '@/components/CustomNumericFormat';

type Props<T> = TextFieldProps & {
    sx?: Record<string, string>;
    size?: string;
    type?: HTMLInputTypeAttribute | 'amount';
    label?: string;
    width?: string;
    noLabel?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    required?: boolean;
    inputStyle?: Record<string, string>;
    maxLength?: number;
    placeholder?: string;
    labelComponent?: React.ReactNode;
    name: Path<T>;
};

export function TextFieldComponent<T extends Record<string, unknown>>(
    {
        label = undefined,
        sx,
        size,
        type,
        name,
        width,
        inputStyle,
        maxLength = 50,
        placeholder,
        labelComponent,
        noLabel = false,
        disabled = false,
        multiline = false,
        required = false,
        ...other
    }: Props<T>,
    ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
    const t = useTranslate();

    const theme = useTheme();

    const {
        control,
        formState: { errors }
    } = useFormContext();

    const error = errors?.[name]?.message;

    const labelTxt = `${startCase(t(label ?? name) ?? '')}${
        required ? '*' : ''
    }`;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl
                    sx={{ pb: error ? 0 : 1, width }}
                    variant="standard"
                    fullWidth>
                    {!noLabel && (
                        <InputLabel
                            sx={{
                                pl: 0.5,
                                color: 'text.secondary',
                                fontSize: 18
                            }}
                            shrink
                            htmlFor={name}>
                            {labelTxt ?? labelComponent}
                        </InputLabel>
                    )}
                    <TextField
                        sx={{
                            mt: noLabel ? 0 : 2.5,
                            border: '1px solid #353535',
                            ...sx
                        }}
                        id={labelTxt}
                        size={size ?? 'small'}
                        type={type}
                        error={!!error}
                        disabled={disabled}
                        multiline={multiline}
                        placeholder={t(placeholder) as string}
                        onInput={(e) => {
                            const el = e.target as HTMLInputElement;
                            el.value = el.value.toString().slice(0, maxLength);
                        }}
                        InputProps={{
                            style: {
                                color: theme.palette.common.white,
                                borderRadius: 0,
                                fontSize: 15,
                                backgroundColor: theme.palette.common.black,
                                ...inputStyle
                            },
                            ...(type === 'amount'
                                ? {
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      inputComponent: CustomNumericFormat as any
                                  }
                                : {})
                        }}
                        {...field}
                        {...other}
                        ref={ref}
                    />
                    {error && (
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                                <FormHelperText textId={message} />
                            )}
                        />
                    )}
                </FormControl>
            )}
        />
    );
}

export const CustomTextField = forwardRef(TextFieldComponent) as <
    T extends Record<string, unknown>
>(
    props: Props<T> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
