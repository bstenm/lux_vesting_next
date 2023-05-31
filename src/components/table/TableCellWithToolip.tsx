'use client';

import { Tooltip } from '../Tooltip';
import { TableCell } from './TableCell';

type Props = {
    title: string;
    children: React.ReactElement & React.ReactNode;
    maxWidth: string;
};

export function TableCellWithToolip({
    title,
    children,
    maxWidth
}: Props): JSX.Element {
    return (
        <TableCell>
            <Tooltip title={title} maxWidth={maxWidth}>
                {children}
            </Tooltip>
        </TableCell>
    );
}
