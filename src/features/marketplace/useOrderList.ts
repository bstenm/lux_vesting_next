import { orderBy } from 'lodash';
import { useState } from 'react';

import { useAction } from 'libs/hooks/useAction';
import { AssetItem } from 'config/types/asset';

import { SortOptionValue } from './SortingSelection';

type Args = {
    list: AssetItem[];
};

type StateLogic = [
    (list: AssetItem[]) => AssetItem[],
    (option?: SortOptionValue) => void
];

export const useOrderList = (): StateLogic => {
    const [sorting, setSorting] = useState<SortOptionValue>();

    const action = ({ list }: Args): AssetItem[] => {
        const { key, direction } = (sorting as SortOptionValue) ?? {};

        if (!key) return list;

        const cond = (e: AssetItem): number | undefined =>
            key === 'updatedAt' ? e.listing?.[key] : e[key];

        return orderBy(list, cond, [direction]);
    };

    const [orderList] = useAction<Args, AssetItem[]>(action, {
        error: 'listOrderingError'
    });

    return [
        (list) => orderList({ list }),
        (entry?: SortOptionValue) => setSorting(entry)
    ];
};
