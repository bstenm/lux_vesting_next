'use client';

import { Button } from 'components/buttons/Button';

type Props = React.ComponentProps<typeof Button> & {
    textId: string;
    loading?: boolean;
};

export function GreenButton({ ...props }: Props): JSX.Element {
    return <Button {...props} color="success" />;
}
