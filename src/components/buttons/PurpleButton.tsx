'use client';

import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import { Button } from '@/components/buttons/Button';

const StyledButton = styled(Button)`
    color: ${purple[400]};
`;

export function PurpleButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <StyledButton {...props} />;
}
