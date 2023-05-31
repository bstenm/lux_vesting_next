'use client';

import { ProductDataPoint } from 'components/dataPoints/ProductDataPoint';

type Props = {
    data?: number;
};

export function ExpectedReturnDataPoint({ data }: Props): JSX.Element {
    return (
        <ProductDataPoint textId="expectedReturn" showMissing={!data}>
            {data?.toLocaleString()}%
        </ProductDataPoint>
    );
}
