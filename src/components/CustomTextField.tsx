'use client';

/* eslint-disable react/require-default-props */
import startCase from 'lodash/startCase';
import { SxProps } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { FormHelperText } from 'components/FormHelperText';
import { Controller, useFormContext, Path } from 'react-hook-form';

type Props<T> = TextFieldProps & {
    name: Path<T>;
    sx?: SxProps<Theme> & string;
    size?: string;
    label?: string;
    width?: string;
    noLabel?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    required?: boolean;
    inputStyle?: string;
    labelComponent?: React.ReactNode;
};

export const CustomTextField = forwardRef(
    <T extends Record<string, unknown>>(
        {
            label = undefined,
            sx,
            size,
            width,
            name,
            inputStyle,
            noLabel = false,
            disabled = false,
            multiline = false,
            required = false,
            labelComponent,
            ...other
        }: Props<T>,
        ref: React.ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
        const { t } = useTranslation();

        const {
            control,
            formState: { errors }
        } = useFormContext();

        const error = errors?.[name]?.message;

        const labelTxt = `${startCase(t(label ?? name))}${required ? '*' : ''}`;

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
) as <T extends Record<string, unknown>>(
    props: Props<T> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
