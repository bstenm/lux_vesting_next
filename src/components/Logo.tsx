'use client';

import Image from 'next/image';

import logo from 'assets/logo.svg';
import { SITE_TITLE } from 'config/constants';

type Props = {
    width: number;
};

export function Logo({ width }: Props): JSX.Element {
    return <Image src={logo} alt={SITE_TITLE} width={width} />;
}
