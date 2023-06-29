import PersonIcon from '@mui/icons-material/Person';
import { useState, MouseEvent } from 'react';

import { IconButton } from '@/components/iconButtons/IconButton';

import { UserMenu } from './UserMenu';

export function UserMenuButton(): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpen = (e: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpen}>
                <PersonIcon sx={{ color: 'primary.light' }} />
            </IconButton>
            <UserMenu anchorEl={anchorEl} handleClose={handleClose} />
        </>
    );
}
