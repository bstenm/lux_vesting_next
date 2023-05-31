'use client';

import { useTranslation } from 'react-i18next';

import BidIconImg from 'assets/bid-icon.png';

type Props = {
    size?: string;
    title?: string;
};

export function BidIcon({ size, title }: Props): JSX.Element {
    const { t } = useTranslation();

    return (
        <img width={size ?? '25px'} alt={t(title ?? 'bid')} src={BidIconImg} />
    );
}
