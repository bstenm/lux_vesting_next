import { useState } from 'react';

import { useAction } from 'libs/hooks/useAction';
import { AssetItem } from 'config/types/asset';
import { getAuctionEndTimestamp } from 'libs/utils';

type Filter = Record<string, unknown>;

type Args = { list: AssetItem[] };

type StateLogic = [
    (list: AssetItem[]) => AssetItem[],
    (filter: Filter) => void
];

export const useFilterList = (): StateLogic => {
    const [constraint, setConstraint] = useState<Filter>({});

    const action = ({ list }: Args): AssetItem[] => {
        let listClone = [...list];

        Object.keys(constraint).forEach((type) => {
            const value = constraint[type] as number;

            if (!value) return;

            switch (type) {
                case 'timeLeft':
                    listClone = listClone.filter((e) => {
                        const { updatedAt } = e.listing ?? {};
                        if (!updatedAt) return false;
                        const timeLeft =
                            getAuctionEndTimestamp(updatedAt) - Date.now();
                        return timeLeft <= value;
                    });
                    break;
                default:
            }
        });

        return listClone;
    };

    const [setListToDisplay] = useAction<Args, AssetItem[]>(action, {
        error: 'listFilteringError'
    });

    return [
        (list) => setListToDisplay({ list }),
        (entry: Filter) => setConstraint(entry)
    ];
};
