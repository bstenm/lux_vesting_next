'use client';

import maxBy from 'lodash/maxBy';

import { Spinner } from '@/components/Spinner';
import { Typography } from '@/components/Typography';
import { TitledAmountData } from '@/components/dataPoints/TitledAmountData';

import { useFetchAssetBids } from './useFetchAssetBids';

type Props = Omit<React.ComponentProps<typeof Typography>, 'align'> & {
    id: string;
    align?: string;
};

export function AssetHighestBid({ id, align, ...props }: Props): JSX.Element {
    const [bids, fetching] = useFetchAssetBids(id);

    const highestBid = maxBy(bids, 'value')?.value;

    if (fetching) {
        return <Spinner />;
    }

    return (
        <TitledAmountData
            sx={{ color: 'success.main' }}
            data={highestBid}
            align={align}
            textId="highestBid"
            {...props}
        />
    );
}
