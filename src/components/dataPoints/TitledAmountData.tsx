'use client';

import { defaultCurrencySymbol } from '@/config';

import { TitledDataPoint } from './TitledDataPoint';

export function TitledAmountData(
    props: React.ComponentProps<typeof TitledDataPoint>
): JSX.Element {
    return <TitledDataPoint prefix={defaultCurrencySymbol} {...props} />;
}
