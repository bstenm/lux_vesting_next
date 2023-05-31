'use client';

import { swap } from 'react-grid-dnd';
import { useState } from 'react';

type StateLogic<T> = {
    items: T[];
    onChange: (
        sourceId: string,
        sourceIndex: number,
        targetIndex: number
    ) => void;
    deleteItem: (index: number) => void;
};

export const useSortableList = <T extends { id: string }>(
    list: T[],
    onReorderList?: (items: T[]) => void,
    onRemoveItem?: (id: string) => void
): StateLogic<T> => {
    const [deletedItems, setDeletedItems] = useState<T[]>([]);

    const [items, setItems] = useState<T[]>(list);

    const onChange = (
        _: string,
        sourceIndex: number,
        targetIndex: number
    ): void => {
        const result = swap(items, sourceIndex, targetIndex);
        setItems(result);
        if (onReorderList) onReorderList(result);
    };

    const deleteItem = (idx: number): void => {
        const copyOfState = list.slice();
        const [deletedElement] = copyOfState.splice(idx, 1);
        setDeletedItems(deletedItems.concat(deletedElement));
        setItems(copyOfState);
        if (onRemoveItem) onRemoveItem(deletedElement.id);
    };

    return { items, onChange, deleteItem };
};
