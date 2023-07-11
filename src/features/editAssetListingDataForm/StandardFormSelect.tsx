'use client';

import { grey } from '@mui/material/colors';
import startCase from 'lodash/startCase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Box, useTheme } from '@mui/material';
import { Controller, useFormContext, Path } from 'react-hook-form';
import ReactSelect, { GroupBase, SelectInstance } from 'react-select';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { FormHelperText } from '@/components/FormHelperText';

type Option = {
    label: string;
    value: string;
};

type Props<T> = React.ComponentProps<typeof ReactSelect> & {
    name: Path<T>;
    label?: string;
    width?: string;
    options: Option[];
    required?: boolean;
};

export function StandardFormSelectComponent<T extends Record<string, unknown>>(
    { width, label, name, options, required, ...other }: Props<T>,
    ref: React.ForwardedRef<
        SelectInstance<unknown, boolean, GroupBase<unknown>>
    >
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
                    <InputLabel
                        sx={{
                            pl: 0.5,
                            color: 'text.secondary',
                            fontSize: 18
                        }}
                        shrink
                        htmlFor={name}>
                        {labelTxt}
                    </InputLabel>
                    <Box>
                        <ReactSelect
                            isClearable
                            options={options}
                            placeholder=""
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    color: theme.palette.common.white,
                                    border: '1px solid #353535',
                                    marginTop: '20px',
                                    borderRadius: 0,
                                    textTransform: 'capitalize',
                                    backgroundColor: theme.palette.common.black
                                }),
                                container: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: theme.palette.common.black
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: theme.palette.common.black
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: theme.palette.common.white,
                                    fontSize: 14
                                }),
                                option: (baseStyles) => ({
                                    ...baseStyles,
                                    color: theme.palette.text.secondary,
                                    fontSize: 14,
                                    textTransform: 'capitalize',
                                    backgroundColor: theme.palette.common.black,
                                    '&:hover': {
                                        color: theme.palette.common.white,
                                        backgroundColor: grey[900]
                                    }
                                })
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
                    </Box>
                </FormControl>
            )}
        />
    );
}

export const StandardFormSelect = forwardRef(StandardFormSelectComponent) as <
    T extends Record<string, unknown>
>(
    props: Props<T> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
