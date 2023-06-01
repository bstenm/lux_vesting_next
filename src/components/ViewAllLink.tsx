'use client';

import Link from 'next/link';
import { Typography } from './Typography';

type Props = {
    to: string;
};

export function ViewAllLink({ to }: Props): JSX.Element {
    return (
        <Link href={to}>
            <Typography
                sx={{ textDecoration: 'underline' }}
                capitalized
                textId="view all"
            />
        </Link>
    );
}
