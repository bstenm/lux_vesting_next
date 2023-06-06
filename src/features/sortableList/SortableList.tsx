'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { GridItem, GridDropZone, GridContextProvider } from 'react-grid-dnd';

import { useSortableList } from './useSortableList';

type Props<T> = {
    list: T[];
    children: (item: T, onRemove: () => void) => React.ReactNode;
    rowHeight: number;
    boxesPerRow: number;
    onReorderList?: (list: T[]) => void;
    onRemoveItem?: (id: string) => void;
};

const StyledGridDropZone = styled(GridDropZone)`
    flex: 1;
    min-height: 270px;
`;

export function SortableList<T extends { id: string }>({
    list,
    children,
    rowHeight,
    boxesPerRow,
    onReorderList,
    onRemoveItem
}: Props<T>): JSX.Element {
    const { items, onChange, deleteItem } = useSortableList(
        list,
        onReorderList,
        onRemoveItem
    );

    return (
        <GridContextProvider onChange={onChange}>
            <Box>
                <StyledGridDropZone
                    id="left"
                    rowHeight={rowHeight}
                    boxesPerRow={boxesPerRow}>
                    {items.map((item, idx) => (
                        <GridItem key={item.id}>
                            {children(item, () => deleteItem(idx))}
                        </GridItem>
                    ))}
                </StyledGridDropZone>
            </Box>
        </GridContextProvider>
    );
}
