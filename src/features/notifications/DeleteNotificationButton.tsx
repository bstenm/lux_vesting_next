'use client';

import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/HighlightOff';

import { IconButton } from '@/components/iconButtons/IconButton';

type Props = {
    onClick: () => void;
};

export function DeleteNotificationButton({ onClick }: Props): JSX.Element {
    return (
        <IconButton
            sx={{
                p: 0
            }}
            onClick={onClick}
            title="delete">
            <DeleteIcon
                fontSize="small"
                sx={{
                    color: grey[500],
                    '&:hover': {
                        color: grey[300]
                    }
                }}
            />
        </IconButton>
    );
}
