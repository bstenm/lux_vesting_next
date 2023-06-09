'use client';

import { Button } from '@/components/buttons/Button';

export function RedButton(
    props: React.ComponentProps<typeof Button>
): JSX.Element {
    return <Button {...props} color="error" />;
}
