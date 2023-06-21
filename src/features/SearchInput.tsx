import { noop } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link } from 'components/Link';
import { path } from 'config/path';

type Filter = {
    searchTerm?: string;
};

type Props = {
    width?: number;
    realTime?: boolean;
    onSubmit?: (filter: Filter) => void;
};

export function SearchInput({
    width,
    realTime,
    onSubmit = noop
}: Props): JSX.Element {
    const searchTerm = useSearchParams().get('query');

    const [input, setInput] = useState<string>(searchTerm ?? '');

    const reset = (): void => {
        setInput('');
        onSubmit({ searchTerm: '' });
    };

    const handleChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(value);
        onSubmit({ searchTerm: value });
    };

    const handleSubmit = (): void => {
        onSubmit({ searchTerm: input });
    };

    return (
        <InputBase
            sx={(theme) => ({
                px: 1,
                width: width ?? 200,
                height: 37,
                margin: 'auto',
                ...theme.filter
            })}
            value={input}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'search' }}
            placeholder="Search…"
            endAdornment={
                realTime ? (
                    <CloseIcon fontSize="small" onClick={() => reset()} />
                ) : (
                    <Link href={`${path.marketplace}?query=${input}`}>
                        <IconButton
                            sx={{ p: 0.5 }}
                            onClick={handleSubmit}
                            aria-label="search">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </IconButton>
                    </Link>
                )
            }
        />
    );
}
