'use client';

import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiButton, { ButtonProps } from '@mui/material/Button';

import { Spinner } from 'components/Spinner';

type Props = ButtonProps & {
    textId?: string;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    contained?: boolean;
    withBorder?: boolean;
    children?: React.ReactNode;
};

export function Button({
    textId,
    loading,
    variant,
    children,
    disabled,
    fullWidth,
    contained,
    withBorder,
    ...props
}: Props): JSX.Element {
    const { t } = useTranslation();

    const theme = useTheme();

    const content = textId ? t(textId ?? '') : children;

    return (
        <MuiButton
            variant={contained ? 'contained' : 'outlined'}
            disabled={loading || disabled}
            sx={{
                width: fullWidth ? '100%' : 'inherit',
                border:
                    withBorder &&
                    props.color &&
                    props.color !== 'inherit' &&
                    !contained
                        ? `1px solid ${theme.palette[props.color]}`
                        : `1px solid ${theme.palette.primary.main}`
            }}
            {...props}>
            {loading ? <Spinner /> : content}
        </MuiButton>
    );
}
