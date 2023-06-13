import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

type Props = {
    onSubmit: (value: string) => void;
};

export function SearchInput({ onSubmit }: Props): JSX.Element {
    const [value, setValue] = useState('');

    const handleChange = ({
        target
    }: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(target.value);
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
                sx={{
                    pl: 2,
                    pr: 1,
                    color: 'common.white',
                    border: (theme) =>
                        `1px solid ${theme.palette.text.secondary}`,
                    fontSize: 14,
                    borderRadius: 6
                }}
                value={value}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
                placeholder="Search…"
                endAdornment={
                    <IconButton
                        sx={{ p: 0.5 }}
                        onClick={() => onSubmit(value)}
                        aria-label="search">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                    </IconButton>
                }
            />
        </Box>
    );
}
