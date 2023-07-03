'use client';

import { useTheme } from '@mui/material/styles';
import { useTranslate } from '@/libs/hooks/useTranslate';
import MuiButton, { ButtonProps } from '@mui/material/Button';

import { Spinner } from '@/components/Spinner';
import { noop } from 'lodash';

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
    onClick,
    loading,
    children,
    disabled,
    fullWidth,
    contained,
    withBorder,
    ...props
}: Props): JSX.Element {
    const t = useTranslate();

    const theme = useTheme();

    const content = textId ? t(textId) : children;

    const border =
        withBorder && props.color && props.color !== 'inherit' && !contained
            ? `1px solid ${theme.palette[props.color]}`
            : `1px solid ${theme.palette.primary.dark}`;

    const enabled = !loading && !disabled;

    return (
        <MuiButton
            variant={contained ? 'contained' : 'outlined'}
            disableRipple={!enabled}
            sx={{
                width: fullWidth ? '100%' : 'inherit',
                cursor: enabled ? 'pointer' : 'default',
                opacity: enabled ? 1 : 0.4,
                border,
                '&:hover': {
                    border: enabled
                        ? border
                        : `1px solid ${theme.palette.primary.dark}`,
                    bgcolor: enabled ? 'inherit' : 'transparent'
                }
            }}
            onClick={enabled ? onClick : noop}
            {...props}>
            {loading ? <Spinner /> : content}
        </MuiButton>
    );
}
