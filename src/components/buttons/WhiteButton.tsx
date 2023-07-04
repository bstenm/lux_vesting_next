'use client';

import { Button } from '@/components/buttons/Button';
import { grey } from '@mui/material/colors';

export function WhiteButton({
    sx,
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return (
        <Button
            sx={{
                color: 'common.white',
                lineHeight: 2,
                borderColor: grey[500],
                borderRadius: 0,
                '&:hover': {
                    borderColor: 'common.white'
                },
                ...sx
            }}
            {...props}
        />
    );
}
