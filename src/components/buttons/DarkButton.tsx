'use client';

import { styled } from '@mui/material/styles';

import { Button } from 'components/buttons/Button';

const StyledButton = styled(Button)(
    ({ theme }) => `
    color: ${theme.palette.primary.dark};
`
);

export function DarkButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <StyledButton {...props} />;
}
