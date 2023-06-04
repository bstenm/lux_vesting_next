'use client';

import { grey } from '@mui/material/colors';
import startCase from 'lodash/startCase';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslate } from 'libs/hooks/useTranslate';
import { useFormContext } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';

import { FormHelperText } from 'components/FormHelperText';

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
                    width: '50ch',
                    '& label': {
                        color: grey[400]
                    },
                    '& .MuiInput-input': {
                        color: 'primary.light'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'common.black'
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'primary.light'
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
