import debounce from 'lodash/debounce';
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
    console.log(constraint);
    const action = ({ list }: Args): AssetItem[] => {
        let listClone = [...list];

        Object.keys(constraint).forEach((type) => {
            const value = constraint[type];

            if (!value) return;

            switch (type) {
                case 'timeLeft':
                    listClone = listClone.filter((e) => {
                        const { updatedAt } = e.listing ?? {};
                        if (!updatedAt) return false;
                        const timeLeft =
                            getAuctionEndTimestamp(updatedAt) - Date.now();
                        return timeLeft <= (value as number);
                    });
                    break;
                case 'priceRangeTo':
                    listClone = listClone.filter(
                        (e) => !value || e.price <= (value as number)
                    );
                    break;
                case 'priceRangeFrom':
                    listClone = listClone.filter(
                        (e) => !value || e.price >= (value as number)
                    );
                    break;
                case 'searchTerm':
                    listClone = listClone.filter((e) =>
                        e.name
                            .toLowerCase()
                            .includes((value as string).toLowerCase())
                    );
                    break;
                default:
            }
        });

        return listClone;
    };

    const [setListToDisplay] = useAction<Args, AssetItem[]>(action, {
        error: 'listFilteringError'
    });

    const debounceInput = debounce((entry: Filter) => {
        setConstraint({ ...constraint, ...entry });
    }, 3000);

    return [(list) => setListToDisplay({ list }), debounceInput];
};
