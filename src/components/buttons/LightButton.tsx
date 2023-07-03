'use client';

import { Button } from '@/components/buttons/Button';

export function LightButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <Button color="primary" {...props} />;
}
