'use client';

import { useState } from 'react';

import { Typography } from 'components/Typography';
import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { defaultAuctionDuration } from 'config';
import { Row } from 'components/Row';

type Filter = {
    timeLeft?: number;
};

type Props = {
    onSelect: (filter: Filter) => void;
};

export function AuctionTimeLeftFilter({ onSelect }: Props): JSX.Element {
    const [filter, setFilter] = useState<Filter>({});

    const toggleTimeLeftFilter = (value: number): void => {
        const newFilter = {
            timeLeft: filter.timeLeft !== value ? value : undefined
        };
        setFilter(newFilter);
        onSelect(newFilter);
    };

    const maxDaysLeft = defaultAuctionDuration;

    const auctionMidway = Math.floor(maxDaysLeft / 2);

    return (
        <Row spacing={2}>
            {[
                { label: '1 hour', value: 3600 * 1000 },
                { label: '1 day', value: 24 * 3600 * 1000 },
                {
                    label: `${auctionMidway} days`,
                    value: auctionMidway * 24 * 3600 * 1000
                },
                {
                    label: `${maxDaysLeft} days`,
                    value: maxDaysLeft * 24 * 3600 * 1000
                }
            ].map((e) => {
                const selected = filter.timeLeft === e.value;
                return (
                    <RoundedGreyBox
                        sx={{ p: 1, cursor: 'pointer' }}
                        key={e.label}
                        light={selected}
                        onClick={() => toggleTimeLeftFilter(e.value)}>
                        <Typography
                            color={selected ? 'primary.light' : 'common.white'}
                            textId={e.label}
                            variant="body2"
                            noWrap
                        />
                    </RoundedGreyBox>
                );
            })}
        </Row>
    );
}
