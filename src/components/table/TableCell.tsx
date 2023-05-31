'use client';

import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentProps<typeof MuiTableCell> & {
    sx?: Record<string, unknown>;
    textId?: string;
    children?: React.ReactNode;
};

const Component = styled(MuiTableCell)(({ theme }) => ({
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    [`&.${tableCellClasses.head}`]: {
        padding: 15,
        borderColor: theme.palette.primary.light,
        whiteSpace: 'normal',
        background: 'linear-gradient(180deg, #2E3641 0%, #343E4B 58.85%)',
        verticalAlign: 'bottom',
        fontWeight: theme.typography.fontWeightRegular
    }
}));

export const Icon = styled(RemoveIcon)`
    color: ${grey[400]};
`;

export function TableCell({
    sx,
    textId,
    children,
    ...other
}: Props): JSX.Element {
    const { t } = useTranslation();

    const text = textId && t(textId);

    return (
        <Component sx={sx} {...other}>
            {children ?? text ?? <Icon fontSize="small" />}
        </Component>
    );
}
