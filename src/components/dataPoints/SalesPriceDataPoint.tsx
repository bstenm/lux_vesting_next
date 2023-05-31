'use client';

import { PriceDataPoint } from 'components/dataPoints/PriceDataPoint';

type Props = {
    data?: number;
};

export function SalesPriceDataPoint({ data }: Props): JSX.Element {
    return <PriceDataPoint data={data} textId="salesPrice" />;
}
