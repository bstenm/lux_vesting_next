'use client';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { Button } from '@/components/buttons/Button';

type Props = {
    disabled: boolean;
    onClick: () => void;
};

export function ReorderButton({ onClick, disabled }: Props): JSX.Element {
    return (
        <Button
            sx={{ color: 'primary.light' }}
            textId="reorder"
            variant="outlined"
            onClick={onClick}
            endIcon={<SwapHorizIcon />}
            disabled={disabled}
        />
    );
}
