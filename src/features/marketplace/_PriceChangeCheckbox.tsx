'use client';

import { Checkbox } from 'components/Checkbox';
import { SelectInputRange } from 'config/types';
import { defaultCurrencySymbol } from 'config';

type Props = {
    id: number;
    range: number[];
    onSelect: (entry: SelectInputRange) => void;
};

export function PriceRangeCheckbox({
    id,
    range,
    onSelect
}: Props): JSX.Element {
    return (
        <Checkbox
            sx={{ pl: 0 }}
            size="small"
            onChange={(e) => {
                onSelect({
                    id: id.toString(),
                    type: 'range',
                    name: 'price',
                    value: range,
                    selected: e.target.checked
                });
            }}
            textId="priceRangeSelect"
            transVars={{
                to: range[1],
                from: range[0],
                currency: defaultCurrencySymbol
            }}
        />
    );
}
