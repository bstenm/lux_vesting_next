'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import { Row } from '@/components/Row';
import { Typography } from '@/components/Typography';
import { defaultAuctionDuration } from '@/config';

type TimeLeftFilter = {
    timeLeft?: number;
};

type Props = {
    selected?: number;
    onToggle: ({ timeLeft }: TimeLeftFilter) => void;
};

export function AuctionTimeLeftFilter({
    selected,
    onToggle
}: Props): JSX.Element {
    const theme = useTheme();

    const auctionMidway = Math.floor(defaultAuctionDuration / 2);

    return (
        <Row spacing={2} alignItems="center">
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
                    <Box
                        sx={{
                            p: 0.8,
                            cursor: 'pointer',
                            border: isSelected
                                ? `1px solid ${theme.palette.text.disabled}`
                                : theme.filter.border
                        }}
                        key={e.label}
                        onClick={() => onToggle({ timeLeft: e.value })}>
                        <Typography
                            bold={isSelected}
                            color={
                                isSelected ? 'common.white' : theme.filter.color
                            }
                            textId={e.label}
                            variant="body2"
                            noWrap
                        />
                    </Box>
                );
            })}
        </Row>
    );
}
