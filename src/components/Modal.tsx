'use client';

import noop from 'lodash/noop';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useTranslation } from 'react-i18next';

import { TitleBanner } from './TitleBanner';

type Props = Omit<
    React.ComponentProps<typeof SweetAlert>,
    'title' | 'onConfirm'
> & {
    title?: string;
    width?: number;
    children?: React.ReactNode;
    noBanner?: boolean;
    fitContent?: boolean;
    onConfirm?: (response: unknown) => unknown;
    gradientBg?: boolean;
};

export function Modal({
    title,
    style,
    width,
    children,
    noBanner,
    fitContent,
    onConfirm,
    gradientBg,
    confirmBtnText,
    ...rest
}: Props): JSX.Element {
    const { t } = useTranslation();

    return (
        <SweetAlert
            title=""
            onConfirm={onConfirm || noop}
            showConfirm={!!onConfirm}
            confirmBtnText={t((confirmBtnText as string) ?? 'OK').toUpperCase()}
            confirmBtnStyle={{ padding: 10 }}
            style={{
                width: fitContent ? undefined : width ?? '32em',
                border: '1px solid #3C4858',
                backgroundColor: !gradientBg
                    ? '#151515'
                    : 'linear-gradient(180deg, #3C4858 0%, #151516 58.85%)',
                color: 'white',
                ...style
            }}
            {...rest}>
            {title && !noBanner && <TitleBanner sx={{ mb: 2 }} data={title} />}
            {children}
        </SweetAlert>
    );
}
