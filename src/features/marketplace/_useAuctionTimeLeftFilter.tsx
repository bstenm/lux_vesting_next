import { useState } from 'react';

import { useAction } from 'libs/hooks/useAction';

type Args = {
    value: number;
};

type HookLogic = [number | undefined, (value: number) => void];

export const useAuctionTimeLeftFilter = (
    onSelect: (filter: number) => void
): HookLogic => {
    const [timeLeft, setTimeLeft] = useState<number>();

    const action = ({ value }: Args): void => {
        const newFilter = timeLeft !== value ? value : undefined;
        setTimeLeft(newFilter);
        onSelect(newFilter);
    };

    const [toggleTimeLeftFilter] = useAction<Args, void>(action, {
        error: 'listFilteringError'
    });

    return [timeLeft, (value) => toggleTimeLeftFilter({ value })];
};
