'use client';

import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

type Props = {
    onClick: () => void;
};

export function CloseButton({ onClick }: Props): JSX.Element {
    return (
        <IconButton
            sx={{ position: 'fixed', top: 5, right: 5 }}
            aria-label="close"
            onClick={onClick}>
            <CloseIcon fontSize="small" sx={{ color: grey[400] }} />
        </IconButton>
    );
}
