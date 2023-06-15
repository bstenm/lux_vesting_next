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
            {[
                1,
                Math.floor(defaultAuctionDuration / 2),
                defaultAuctionDuration
            ].map((count) => {
                const selected = filter.daysLeft === count;
                return (
                    <RoundedGreyBox
                        sx={{ p: 1, cursor: 'pointer' }}
                        key={count}
                        light={selected}
                        onClick={() => toggleDaysLeftFilter(count)}>
                        <Typography
                            color={selected ? 'primary.light' : 'common.white'}
                            textId={count > 1 ? 'day_other' : 'day_one'}
                            variant="body2"
                            transVars={{ count }}
                        />
                    </RoundedGreyBox>
                );
            })}
        </>
    );
}
