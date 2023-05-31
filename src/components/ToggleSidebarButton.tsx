'use client';

import { styled } from '@mui/material/styles';
import MuiMenuIcon from '@mui/icons-material/Menu';

const Container = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: 35,
    height: 35,
    color: '#353535',
    textAlign: 'center',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'flex'
    }
}));

type Props = {
    toggle: (value: boolean) => void;
};

const MenuIcon = styled(MuiMenuIcon)(
    ({ theme }) => `
    color: ${theme.palette.primary.light}
`
);

export function ToggleSidebarButton({ toggle }: Props): JSX.Element {
    return (
        <Container onClick={() => toggle(true)}>
            <MenuIcon />
        </Container>
    );
}
