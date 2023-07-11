'use client';

import { grey } from '@mui/material/colors';
import startCase from 'lodash/startCase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material';
import { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext, Path } from 'react-hook-form';
import ReactSelect, { GroupBase, SelectInstance } from 'react-select';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { FormHelperText } from '@/components/FormHelperText';

type Option = {
    label: string;
    value: string;
};

type Props<T> = Omit<React.ComponentProps<typeof ReactSelect>, 'onChange'> & {
    name: Path<T>;
    label?: string;
    options: string[];
    required?: boolean;
};

export function StandardFormSelectComponent<T extends Record<string, unknown>>(
    { label, name, options, required, ...other }: Props<T>,
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
            render={({ field: { value, onChange } }) => (
                <FormControl
                    sx={{ pb: error ? 0 : 1 }}
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
                    <ReactSelect
                        isClearable
                        options={options.map((color) => ({
                            label: color,
                            value: color
                        }))}
                        value={options.find(
                            (option) => (option as Option).value === value
                        )}
                        onChange={(option) =>
                            onChange((option as Option).value)
                        }
                        placeholder=""
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                color: theme.palette.common.white,
                                border: '1px solid #353535',
                                borderRadius: 0,
                                textTransform: 'capitalize',
                                backgroundColor: theme.palette.common.black
                            }),
                            container: (baseStyles) => ({
                                ...baseStyles,
                                marginTop: '20px',
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
                        ref={ref}
                        {...other}
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

export const StandardFormSelect = forwardRef(StandardFormSelectComponent) as <
    T extends Record<string, unknown>
>(
    props: Props<T> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
