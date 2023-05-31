'use client';

import { ProductDataPoint } from 'components/dataPoints/ProductDataPoint';

type Props = {
    data?: number;
};

export function QuantityDataPoint({ data }: Props): JSX.Element {
    return (
        <ProductDataPoint textId="quantity" showMissing={!data}>
            {data?.toLocaleString()}
        </ProductDataPoint>
    );
}
