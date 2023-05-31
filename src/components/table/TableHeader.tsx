'use client';

import TableHead from '@mui/material/TableHead';
import { TableCellProps } from '@mui/material';

import { TableCell } from './TableCell';
import { TableRow } from './TableRow';

type Props = React.ComponentProps<typeof TableHead> & {
    headers: string[];
    alignText?: TableCellProps['align'];
};

export function TableHeader({
    headers,
    alignText = 'left',
    ...other
}: Props): JSX.Element {
    return (
        <TableHead {...other}>
            <TableRow>
                {headers.map((header) => (
                    <TableCell key={header} align={alignText} textId={header} />
                ))}
            </TableRow>
        </TableHead>
    );
}
