'use client';

import { Button } from '@/components/buttons/Button';

export function DarkButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return (
        <Button
            sx={(theme) => ({
                color: theme.palette.primary.dark,
                '&:hover': {
                    border: `1px solid ${theme.palette.primary.dark}`
                }
            })}
            {...props}
        />
    );
}
