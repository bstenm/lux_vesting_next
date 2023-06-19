'use client';

import { grey } from '@mui/material/colors';
import ReactSelect from 'react-select';
import { useTheme } from '@mui/material/styles';

export type SortOptionValue = {
    key: 'price' | 'updatedAt';
    direction: 'asc' | 'desc';
};

type SortOption = {
    label: string;
    value: SortOptionValue;
};

type Props = {
    onSelect: (option?: SortOptionValue) => void;
};

const sorting: SortOption[] = [
    {
        label: 'price ascending',
        value: { key: 'price', direction: 'asc' }
    },
    {
        label: 'price descending',
        value: { key: 'price', direction: 'desc' }
    },
    {
        label: 'newest first',
        value: { key: 'updatedAt', direction: 'asc' }
    },
    {
        label: 'newest last',
        value: { key: 'updatedAt', direction: 'desc' }
    }
];

export function SortingSelection({ onSelect }: Props): JSX.Element {
    const theme = useTheme();

    const onChange = (option: SortOption | null): void => {
        onSelect(option?.value);
    };

    return (
        <ReactSelect
            isClearable
            options={sorting}
            onChange={onChange}
            placeholder="sort by..."
            styles={{
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.filter.color,
                    fontSize: theme.filter.fontSize
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    width: 190,
                    border: theme.filter.border,
                    borderRadius: theme.filter.borderRadius,
                    textTransform: 'capitalize',
                    backgroundColor: theme.filter.bgcolor,
                    '&:hover': {
                        border: theme.filter.borderHover
                    }
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: theme.filter.bgcolor
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.text.secondary,
                    fontSize: 13,
                    textTransform: 'capitalize',
                    backgroundColor: theme.filter.bgcolor,
                    '&:hover': {
                        color: theme.palette.common.white,
                        backgroundColor: grey[900]
                    }
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.filter.color,
                    fontSize: theme.filter.fontSize
                }),
                container: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    minHeight: 0
                }),
                clearIndicator: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0
                })
            }}
        />
    );
}
