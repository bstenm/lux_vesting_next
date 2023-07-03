'use client';

import { grey } from '@mui/material/colors';
import startCase from 'lodash/startCase';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { useTranslate } from '@/libs/hooks/useTranslate';
import { FormHelperText } from '@/components/FormHelperText';

type Props = React.ComponentProps<typeof TextField> & {
    label?: string;
    name: string;
    required?: boolean;
    placeholder?: string;
};

export function TextInput({
    name,
    label,
    required,
    placeholder,
    ...props
}: Props): JSX.Element {
    const t = useTranslate();

    const {
        register,
        formState: { errors }
    } = useFormContext();

    const error = errors?.[name]?.message;

    const { sx, ...other } = props;

    const labelText = label && `${startCase(t(label))}${required ? '*' : ''}`;

    const placeholderText =
        placeholder && `${startCase(t(placeholder))}${required ? '*' : ''}`;

    return (
        <FormControl>
            <TextField
                sx={{
                    '& label': {
                        color: grey[400]
                    },
                    '& .MuiInput-input': {
                        color: 'primary.main'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'common.black'
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'primary.main'
                    },
                    ...sx
                }}
                label={labelText}
                placeholder={placeholderText}
                variant="standard"
                {...register(name)}
                {...other}
            />
            {error && (
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }: { message: string }) => (
                        <FormHelperText textId={message} />
                    )}
                />
            )}
        </FormControl>
    );
}
