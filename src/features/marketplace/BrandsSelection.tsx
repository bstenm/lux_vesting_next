'use client';

import { SelectInputMultiValue } from 'config/types';

import { Select } from './Select';

type Filter = {
    brands: SelectInputMultiValue['value'];
};

type Props = {
    onSelect: (filter: Filter) => void;
};

const brands = [
    { value: 'rolex', label: 'rolex' },
    { value: 'omega', label: 'omega' }
];

export function BrandsSelection({ onSelect }: Props): JSX.Element {
    return (
        <Select
            isMulti
            name="brand"
            options={brands}
            onSelect={({ value }) =>
                onSelect({ brands: value as SelectInputMultiValue['value'] })
            }
            placeholder="select  brand..."
        />
    );
}
