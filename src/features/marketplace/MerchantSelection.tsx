'use client';

import { SelectInputValue } from 'config/types';

import { Select } from './Select';

type SelectedMerchant = {
    merchant: SelectInputValue;
};

type Props = {
    onSelect: ({ merchant }: SelectedMerchant) => void;
};

const merchants = [
    { value: 'Bertrand Steinmetz', label: 'Bertrand Steinmetz' },
    { value: 'Lux Vesting', label: 'Lux Vesting' }
];

export function MerchantSelection({ onSelect }: Props): JSX.Element {
    return (
        <Select
            isClearable
            name="merchantName"
            options={merchants}
            onSelect={(value) =>
                onSelect({ merchant: value as SelectInputValue })
            }
            placeholder="select  merchant..."
        />
    );
}
