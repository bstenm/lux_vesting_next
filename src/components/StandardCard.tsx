'use client';

import { styled } from '@mui/material';
import MuiCard from '@mui/material/Card';

type Props = React.ComponentProps<typeof MuiCard> & {
    width?: string;
    children: React.ReactNode;
};

const Card = styled(MuiCard)(
    ({ theme }) => `
    color: white;
    padding: ${theme.spacing(4)};
    border-radius: 5px;
    background: linear-gradient(180deg, #3C4858 0%, #151516 58.85%);
`
);

export function StandardCard({ sx, width, children }: Props): JSX.Element {
    return <Card sx={{ ...{ width }, ...sx }}>{children}</Card>;
}
