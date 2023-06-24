import debounce from 'lodash/debounce';
import { useState } from 'react';

import { useAction } from 'libs/hooks/useAction';
import { AssetItem } from 'config/types/asset';
import { getAuctionEndTimestamp } from 'libs/utils';
import { SelectInputMultiValue, SelectInputValue } from 'config/types';

type Filter = {
    brands?: SelectInputMultiValue;
    timeLeft?: number;
    merchant?: SelectInputValue;
    searchTerm?: string;
    priceRangeTo?: string;
    priceRangeFrom?: string;
};

const initialFilter: Filter = {
    brands: [],
    timeLeft: undefined,
    merchant: undefined,
    searchTerm: '',
    priceRangeTo: '',
    priceRangeFrom: ''
};

type Args = { list: AssetItem[] };

type StateLogic = [
    Filter,
    (list: AssetItem[]) => AssetItem[],
    (filter: Filter) => void,
    () => void
];

export const useFilterList = (): StateLogic => {
    const [constraint, setConstraint] = useState<Filter>({});

    const [realTimeConstraint, setRealTimeConstraint] = useState<Filter>({});

    const action = ({ list }: Args): AssetItem[] => {
        let listClone = [...list];

        Object.keys(constraint).forEach((type) => {
            const value = constraint[type as keyof Filter];

            if (!value) return;

            switch (type as keyof Filter) {
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
                        (e) => e.price <= parseInt(value as string, 10)
                    );
                    break;
                case 'priceRangeFrom':
                    listClone = listClone.filter(
                        (e) => e.price >= parseInt(value as string, 10)
                    );
                    break;
                case 'searchTerm':
                    listClone = listClone.filter((e) =>
                        e.name
                            .toLowerCase()
                            .includes((value as string).toLowerCase())
                    );
                    break;
                case 'merchant':
                    listClone = listClone.filter(
                        (e) =>
                            e.merchantName.toLowerCase() ===
                            (value as string).toLowerCase()
                    );
                    break;
                case 'brands':
                    listClone = listClone.filter((e) => {
                        if (!(value as string[]).length) return true;
                        if (!e.brand) return false;
                        return (value as string[]).includes(
                            e.brand.toLowerCase()
                        );
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

    const filterList = (list: AssetItem[]): AssetItem[] => {
        return setListToDisplay({ list });
    };

    const debounceAddConstraint = debounce((filter: Filter): void => {
        setConstraint({ ...constraint, ...filter });
    }, 300);

    const addConstraint = (filter: Filter): void => {
        // Toggling the timeLeft value  disables this timeLeft filter
        const { timeLeft } = filter;
        const timeLeftToggled = timeLeft && constraint.timeLeft === timeLeft;
        const entry = timeLeftToggled ? { timeLeft: undefined } : filter;
        // We need that to update the filter values in real time (without debounce)
        setRealTimeConstraint({ ...realTimeConstraint, ...entry });
        debounceAddConstraint(entry);
    };

    const resetFilter = (): void => {
        setRealTimeConstraint(initialFilter);
        setConstraint(initialFilter);
    };

    return [realTimeConstraint, filterList, addConstraint, resetFilter];
};
