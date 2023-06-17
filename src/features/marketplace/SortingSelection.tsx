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
                    color: theme.palette.text.secondary,
                    fontSize: 13
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    width: 185,
                    borderColor: theme.palette.text.secondary,
                    textTransform: 'capitalize',
                    backgroundColor: theme.palette.common.black,

                    '&:hover': {
                        borderColor: theme.palette.common.white
                    }
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: theme.palette.common.black
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.text.secondary,
                    fontSize: 13,
                    textTransform: 'capitalize',
                    backgroundColor: theme.palette.common.black,
                    '&:hover': {
                        color: theme.palette.common.white,
                        backgroundColor: grey[900]
                    }
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.text.secondary,
                    fontSize: 13
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
