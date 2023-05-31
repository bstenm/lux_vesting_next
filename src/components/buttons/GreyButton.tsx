'use client';

import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { Button } from 'components/buttons/Button';

const StyledButton = styled(Button)`
    color: ${grey};
`;

export function GreyButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <StyledButton {...props} />;
}
