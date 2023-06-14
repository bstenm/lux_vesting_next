'use client';

import { useState } from 'react';

import { Typography } from 'components/Typography';
import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { defaultAuctionDuration } from 'config';

type Filter = {
    daysLeft?: number;
};

type Props = {
    onSelect: (filter: Filter) => void;
};

export function AuctionTimeLeftFilter({ onSelect }: Props): JSX.Element {
    const [filter, setFilter] = useState<Filter>({});

    const toggleDaysLeftFilter = (count: number): void => {
        const newFilter = {
            daysLeft: filter.daysLeft !== count ? count : undefined
        };
        setFilter(newFilter);
        onSelect(newFilter);
    };

    return (
        <>
            {Array.from({ length: defaultAuctionDuration }, (x, i) => i).map(
                (count) => {
                    const selected = filter.daysLeft === count + 1;
                    return (
                        <RoundedGreyBox
                            sx={{ p: 1, cursor: 'pointer' }}
                            key={count}
                            light={selected}
                            onClick={() => toggleDaysLeftFilter(count + 1)}>
                            <Typography
                                color={
                                    selected ? 'primary.light' : 'common.white'
                                }
                                textId={count > 0 ? 'day_other' : 'day_one'}
                                variant="body2"
                                transVars={{ count: count + 1 }}
                            />
                        </RoundedGreyBox>
                    );
                }
            )}
        </>
    );
}
