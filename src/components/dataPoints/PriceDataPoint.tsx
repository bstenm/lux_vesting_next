'use client';

import { ProductDataPoint } from 'components/dataPoints/ProductDataPoint';
import { defaultCurrencySymbol } from 'config';

type Props = {
    data?: number;
    textId: string;
};

export function PriceDataPoint({ data, textId }: Props): JSX.Element {
    return (
        <ProductDataPoint textId={textId} showMissing={!data}>
            {defaultCurrencySymbol}
            {data?.toLocaleString()}
        </ProductDataPoint>
    );
}
