'use client';

import { Typography } from 'components/Typography';
import { defaultAuctionDuration } from 'config';
import { useEffect, useState } from 'react';

type Props = {
    startedAt: number;
};

export function TimeLeft({ startedAt }: Props): JSX.Element {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const auctionEndTimestamp = defaultAuctionDuration * 24 * 3600 * 1000;

    const secondsLeft = (startedAt + auctionEndTimestamp - time) / 1000;

    const daysLeft = Math.floor(secondsLeft / 86400);

    const hoursLeft = Math.floor(secondsLeft / 3600) % 24;

    const minLeft = Math.floor(secondsLeft / 60) % 60;

    const display =
        daysLeft > 0
            ? `${daysLeft} days ${hoursLeft} hours `
            : `${hoursLeft} HOURS ${minLeft} MIN`;

    return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {display} left
        </Typography>
    );
}
