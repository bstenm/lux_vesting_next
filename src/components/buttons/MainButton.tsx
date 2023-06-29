'use client';

import { Button } from '@/components/buttons/Button';

export function MainButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <Button {...props} />;
}
