'use client';

import { capitalize } from 'lodash';
import { useTranslate } from 'libs/hooks/useTranslate';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';

import { Spinner } from 'components/Spinner';

type Props = IconButtonProps & {
    processing?: boolean;
};

export function IconButton(props: Props): JSX.Element {
    const t = useTranslate();

    const {
        title,
        children,
        disabled,
        processing,
        'aria-label': ariaLabel,
        ...rest
    } = props;

    const transTitle = t(title);

    const transAriaLabel = t(ariaLabel || title) || '';

    return (
        <MuiIconButton
            title={capitalize(transTitle)}
            disabled={disabled || processing}
            aria-label={transAriaLabel}
            {...rest}>
            {processing ? <Spinner /> : children}
        </MuiIconButton>
    );
}
