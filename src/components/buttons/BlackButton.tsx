'use client';

import { styled } from '@mui/material/styles';

import { Button } from '@/components/buttons/Button';

const StyledButton = styled(Button)(
    ({ theme }) => `
    color: ${theme.palette.common.white};
    background: ${theme.palette.common.black};
    &: hover {
        background: ${theme.palette.common.black};
    }
`
);

export function BlackButton({
    ...props
}: React.ComponentProps<typeof Button>): JSX.Element {
    return <StyledButton {...props} />;
}
