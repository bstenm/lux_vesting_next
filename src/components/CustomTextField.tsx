'use client';

import startCase from 'lodash/startCase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslate } from 'libs/hooks/useTranslate';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { FormHelperText } from 'components/FormHelperText';
import { Controller, useFormContext, Path } from 'react-hook-form';

type Props<T> = TextFieldProps & {
    name: Path<T>;
    sx?: Record<string, string>;
    size?: string;
    label?: string;
    width?: string;
    noLabel?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    required?: boolean;
    inputStyle?: Record<string, string>;
    placeholder?: string;
    labelComponent?: React.ReactNode;
};

export function TextFieldComponent<T extends Record<string, unknown>>(
    {
        label = undefined,
        sx,
        size,
        width,
        name,
        inputStyle,
        placeholder,
        noLabel = false,
        disabled = false,
        multiline = false,
        required = false,
        labelComponent,
        ...other
    }: Props<T>,
    ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
    const t = useTranslate();

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
                    sx={{ pb: error ? 0 : 3, width }}
                    variant="standard"
                    fullWidth>
                    {!noLabel && (
                        <InputLabel shrink htmlFor={name}>
                            {labelTxt ?? labelComponent}
                        </InputLabel>
                    )}
                    <TextField
                        sx={{ mt: noLabel ? 0 : 2, ...sx }}
                        id={labelTxt}
                        size={size ?? 'small'}
                        error={!!error}
                        disabled={disabled}
                        multiline={multiline}
                        placeholder={t(placeholder) as string}
                        InputProps={{
                            style: {
                                backgroundColor: '#fff',
                                ...inputStyle
                            }
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
