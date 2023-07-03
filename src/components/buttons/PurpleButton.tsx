'use client';

import { Button } from '@/components/buttons/Button';

export function PurpleButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <Button color="secondary" {...props} />;
}
