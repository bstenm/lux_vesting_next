'use client';

import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';

import { Logo } from 'components/Logo';
import { SITE_TITLE } from 'config/constants';
import siteTitleGraphic from 'assets/site-title.svg';

type Props = {
    onClick: () => void;
    collapsed: boolean;
    handleCollapse: () => void;
};

const Link = styled(NextLink)`
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

export function SidebarTitle({
    onClick,
    collapsed,
    handleCollapse
}: Props): JSX.Element {
    return (
        <Link href="/" onClick={onClick}>
            {collapsed ? (
                <Logo width="60px" />
            ) : (
                <Stack alignItems="center" spacing={2} onClick={handleCollapse}>
                    <Logo width="143px" />
                    <Image src={siteTitleGraphic} alt={SITE_TITLE} />
                </Stack>
            )}
        </Link>
    );
}
