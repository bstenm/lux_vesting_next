'use client';

import { SelectInputValue } from '@/config/types';

import { Select } from './Select';

type SelectedMerchant = {
    merchant: SelectInputValue;
};

type Props = {
    onSelect: ({ merchant }: SelectedMerchant) => void;
    selected?: SelectInputValue;
};

const merchants = [
    { value: 'Bertrand Steinmetz', label: 'Bertrand Steinmetz' },
    { value: 'Lux Vesting', label: 'Lux Vesting' }
];

export function MerchantSelection({ selected, onSelect }: Props): JSX.Element {
    const input = merchants.filter((e) => selected === e.value);

    return (
        <Select
            isClearable
            value={input}
            name="merchantName"
            options={merchants}
            onSelect={(value) =>
                onSelect({ merchant: value as SelectInputValue })
            }
            placeholder="select  merchant..."
        />
    );
}
