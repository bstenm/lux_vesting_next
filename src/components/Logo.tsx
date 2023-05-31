'use client';

import logo from 'assets/logo.svg';
import { SITE_TITLE } from 'config/constants';

type Props = {
    width: string;
};

export function Logo({ width }: Props): JSX.Element {
    return <img src={logo} alt={SITE_TITLE} width={width} />;
}
