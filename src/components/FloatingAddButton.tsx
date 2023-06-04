'use client';

import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

type Props = {
    onClick: () => void;
};

export function FloatingAddButton({ onClick }: Props): JSX.Element {
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
            onClick={onClick}>
            <AddIcon fontSize="large" sx={{ color: 'common.black' }} />
        </IconButton>
    );
}
