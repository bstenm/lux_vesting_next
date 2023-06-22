'use client';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { defaultAuctionDuration } from 'config';

type Props = {
    selected?: number;
    onToggle: (value: number) => void;
};

export function AuctionTimeLeftFilter({
    selected,
    onToggle
}: Props): JSX.Element {
    const auctionMidway = Math.floor(defaultAuctionDuration / 2);

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
                    label: `${defaultAuctionDuration} days`,
                    value: defaultAuctionDuration * 24 * 3600 * 1000
                }
            ].map((e) => {
                const isSelected = selected === e.value;

                return (
                    <RoundedGreyBox
                        sx={{ p: 1, cursor: 'pointer' }}
                        key={e.label}
                        light={isSelected}
                        onClick={() => onToggle(e.value)}>
                        <Typography
                            color="common.white"
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
