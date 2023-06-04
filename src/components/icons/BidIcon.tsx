'use client';

import Image from 'next/image';
import { useTranslate } from 'libs/hooks/useTranslate';

import BidIconImg from 'assets/bid-icon.png';

type Props = {
    size?: number;
    title?: string;
};

export function BidIcon({ size, title }: Props): JSX.Element {
    const t = useTranslate();

    return (
        <Image width={size ?? 25} alt={t(title ?? 'bid')} src={BidIconImg} />
    );
}
