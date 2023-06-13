'use client';

import { useEffect, useState } from 'react';

import { Typography } from 'components/Typography';
import { timeLeftForAuction } from 'libs/utils';

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

    return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {timeLeftForAuction(time, startedAt)} left
        </Typography>
    );
}
