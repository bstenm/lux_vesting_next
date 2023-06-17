import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

type Filter = {
    searchTerm?: string;
};

type Props = {
    realTime?: boolean;
    onSubmit: (filter: Filter) => void;
};

export function SearchInput({ realTime, onSubmit }: Props): JSX.Element {
    const ref = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState('');

    const reset = (): void => {
        setValue('');
        onSubmit({ searchTerm: null });
    };

    const debounceSearch = debounce((searchTerm: string) => {
        onSubmit({ searchTerm });
    }, 300);

    const handleChange = ({
        target
    }: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(target.value);
        if (realTime) {
            debounceSearch(value);
        }
    };

    return (
        <Box
            sx={{
                mb: 2,
                width: '100%',
                display: 'flex',
                margin: 'auto',
                alignItems: 'center'
            }}>
            <InputBase
                ref={ref}
                sx={{
                    pl: 2,
                    pr: 1,
                    color: 'common.white',
                    border: (theme) =>
                        `1px solid ${theme.palette.text.secondary}`,
                    fontSize: 14,
                    borderRadius: 1
                }}
                value={value}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
                placeholder="Search…"
                endAdornment={
                    realTime ? (
                        <CloseIcon fontSize="small" onClick={() => reset()} />
                    ) : (
                        <IconButton
                            sx={{ p: 0.5 }}
                            onClick={() => onSubmit({ searchTerm: value })}
                            aria-label="search">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </IconButton>
                    )
                }
            />
        </Box>
    );
}
