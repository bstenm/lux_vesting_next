'use client';

import { grey } from '@mui/material/colors';
import RSelect from 'react-select';
import { useTheme } from '@mui/material/styles';

import { SelectInputValue, SelectInputMultiValue } from '@/config/types';

type Option = { value: string | Record<string, string>; label: string };

type Props = React.ComponentProps<typeof RSelect> & {
    name: string;
    options: Option[];
    onSelect: (entry: SelectInputValue | SelectInputMultiValue) => void;
    placeholder?: string;
};

export function Select({
    name,
    options,
    onSelect,
    placeholder,
    ...rest
}: Props): JSX.Element {
    const theme = useTheme();

    return (
        <RSelect
            options={options}
            placeholder={placeholder ?? name}
            onChange={(option) => {
                onSelect(
                    rest.isMulti
                        ? (option as Option[]).map((entry) => entry.value)
                        : (option as Option)?.value
                );
            }}
            styles={{
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.common.white
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
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
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.common.black,
                    textTransform: 'capitalize',
                    '&:hover': {
                        backgroundColor: grey[900]
                    }
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.common.white,
                    textTransform: 'capitalize'
                }),
                multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.common.black,
                    borderRadius: 0,
                    textTransform: 'capitalize'
                }),
                multiValueRemove: (baseStyles) => ({
                    ...baseStyles,
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.common.black,
                    borderRadius: 0
                })
            }}
            {...rest}
        />
    );
}
