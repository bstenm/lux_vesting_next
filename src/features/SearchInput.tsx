import { noop, startCase } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/components/Link';
import { path } from '@/config/path';
import { useTranslate } from '@/libs/hooks/useTranslate';

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
    const t = useTranslate();

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
                pl: 2,
                pr: 1,
                color: 'common.white',
                width: width ?? 300,
                height: 37,
                border: `1px solid ${theme.palette.text.secondary}`,
                borderRadius: 1
            })}
            value={input}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'search' }}
            placeholder={`${startCase(t('searchMarketplace'))}…`}
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
