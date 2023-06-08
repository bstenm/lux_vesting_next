import NextLink from 'next/link';

import { Typography } from './Typography';

type Props = React.ComponentProps<typeof Typography> & {
    href: string;
    children?: React.ReactNode;
};

export function Link({ href, children, ...props }: Props): JSX.Element {
    const node = props.textId ? <Typography {...props} /> : children;

    return <NextLink href={href}>{node}</NextLink>;
}
