'use client';

import startCase from 'lodash/startCase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material';
import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext, Path } from 'react-hook-form';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { FormHelperText } from '@/components/FormHelperText';

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
                            ...sx
                        }}
                        id={labelTxt}
                        size={size ?? 'small'}
                        error={!!error}
                        disabled={disabled}
                        multiline={multiline}
                        placeholder={t(placeholder) as string}
                        InputProps={{
                            style: {
                                color: theme.palette.common.white,
                                borderRadius: 0,
                                fontSize: 15,
                                backgroundColor: theme.palette.common.black,
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
