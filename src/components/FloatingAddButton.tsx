'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

type Props = {
    onClick: () => void;
};

export function FloatingAddButton({ onClick }: Props): JSX.Element {
    const [hover, setHover] = useState<boolean>(false);

    const handleMouseEnter = (): void => {
        setHover(true);
    };

    const handleMouseLeave = (): void => {
        setHover(false);
    };

    return (
        <IconButton
            sx={{
                right: 20,
                bottom: 20,
                width: 50,
                height: 50,
                opacity: 0.4,
                bgcolor: 'secondary.light',
                position: 'fixed',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                '&:hover': {
                    opacity: 0.8,
                    bgcolor: 'secondary.light'
                }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}>
            <AddIcon fontSize="large" sx={{ color: 'common.black' }} />
        </IconButton>
    );
}
