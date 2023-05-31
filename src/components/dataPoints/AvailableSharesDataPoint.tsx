'use client';

import { ProductDataPoint } from 'components/dataPoints/ProductDataPoint';

type Props = {
    data?: number;
};

export function AvailableSharesDataPoint({ data }: Props): JSX.Element {
    return (
        <ProductDataPoint textId="availableShares" showMissing={!data}>
            {data?.toLocaleString()}
        </ProductDataPoint>
    );
}
