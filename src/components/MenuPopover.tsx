import Menu from '@mui/material/Menu';
import { styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export const MenuPopoverItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    '&:hover': {
        backgroundColor: theme.palette.common.black
    }
}));

export function MenuPopover(
    props: React.ComponentProps<typeof Menu>
): JSX.Element {
    return (
        <Menu
            sx={{
                zIndex: 6000,
                '& .MuiMenu-paper': {
                    border: '1px solid #3C4858',
                    bgcolor: '#252525'
                }
            }}
            id="menu-appbar"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            {...props}
        />
    );
}
