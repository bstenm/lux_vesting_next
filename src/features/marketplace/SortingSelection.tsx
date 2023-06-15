'use client';

import { grey } from '@mui/material/colors';
import RSelect from 'react-select';
import { useTheme } from '@mui/material/styles';

export type SortOptionValue = {
    key: string;
    direction: 'asc' | 'desc';
};

type SortOption = {
    label: string;
    value: SortOptionValue;
};

type Selection = {
    orderBy?: SortOptionValue;
};

type Props = {
    onSelect: (sorting: Selection) => void;
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
        value: { key: 'listedAt', direction: 'asc' }
    },
    {
        label: 'newest last',
        value: { key: 'listedAt', direction: 'desc' }
    }
];

export function SortingSelection({ onSelect }: Props): JSX.Element {
    const theme = useTheme();

    const onChange = (option: SortOption | null): void => {
        onSelect({
            orderBy: option?.value
        });
    };

    return (
        <RSelect
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
