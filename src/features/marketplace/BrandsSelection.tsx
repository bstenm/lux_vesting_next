'use client';

import { SelectInputMultiValue } from '@/config/types';

import { Select } from './Select';

type Filter = {
    brands: SelectInputMultiValue;
};

type Props = {
    onSelect: (filter: Filter) => void;
    selected?: SelectInputMultiValue;
};

const brands = [
    { value: 'rolex', label: 'rolex' },
    { value: 'omega', label: 'omega' }
];

export function BrandsSelection({
    selected = [],
    onSelect
}: Props): JSX.Element {
    const input = brands.filter((e) => selected.includes(e.value));

    return (
        <Select
            isMulti
            value={input}
            name="brand"
            options={brands}
            onSelect={(value) =>
                onSelect({ brands: value as SelectInputMultiValue })
            }
            placeholder="select  brand..."
        />
    );
}
