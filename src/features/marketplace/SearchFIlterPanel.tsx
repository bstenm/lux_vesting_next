'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { Typography } from 'components/Typography';
import { SelectFilterEntry } from 'config/types';

import { Select } from './Select';
import { PriceRangeCheckbox } from './PriceChangeCheckbox';

type Props = {
    isOpen: boolean;
    onSelectFilter: (entry: SelectFilterEntry) => void;
};

const brands = [
    { value: 'rolex', label: 'rolex' },
    { value: 'omega', label: 'omega' }
];

const merchants = [
    { value: 'Bertrand Steinmetz', label: 'Bertrand Steinmetz' },
    { value: 'Lux Vesting', label: 'Lux Vesting' }
];

const priceRanges = [
    [1000, 10000],
    [10000, 30000],
    [30000, 50000],
    [50000, 80000]
];

const sorting = [
    {
        label: 'price ascending',
        value: { key: 'price', direction: 'ascending' }
    },
    {
        label: 'price descending',
        value: { key: 'price', direction: 'descending' }
    },
    {
        label: 'newest first',
        value: { key: 'listedAt', direction: 'ascending' }
    },
    {
        label: 'newest last',
        value: { key: 'listedAt', direction: 'descending' }
    }
];

export function SearchFIlterPanel({
    isOpen,
    onSelectFilter
}: Props): JSX.Element {
    return (
        <Box
            sx={{
                p: 4,
                top: 125,
                right: isOpen ? 20 : -400,
                width: 300,
                bgcolor: '#151515',
                position: 'fixed',
                transition: 'all 0.3s ease'
            }}>
            <Stack spacing={4}>
                <Select
                    isClearable
                    name="sortBy"
                    options={sorting}
                    onSelect={onSelectFilter}
                    placeholder="sort by..."
                />
                <Select
                    isMulti
                    name="brand"
                    options={brands}
                    onSelect={onSelectFilter}
                    placeholder="select  brand..."
                />
                <Select
                    isClearable
                    name="merchantName"
                    options={merchants}
                    onSelect={onSelectFilter}
                    placeholder="select  merchant..."
                />
                <Stack spacing={1}>
                    <Typography
                        allCapitalized
                        color="text.secondary"
                        textId="priceRanges"
                    />
                    <Divider
                        sx={{
                            width: 100,
                            bgcolor: 'text.secondary',
                            opacity: 0.5
                        }}
                    />
                    {priceRanges.map((range, id) => (
                        <PriceRangeCheckbox
                            id={id}
                            key={range.toString()}
                            range={range}
                            onSelect={onSelectFilter}
                        />
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}
