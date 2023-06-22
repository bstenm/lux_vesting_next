import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';

type SearchFilter = {
    searchTerm?: string;
};

type Props = {
    input?: string;
    onSubmit: (filter: SearchFilter) => void;
};

export function SearchInput({ input, onSubmit }: Props): JSX.Element {
    const reset = (): void => {
        onSubmit({ searchTerm: '' });
    };

    const handleChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLInputElement>): void => {
        onSubmit({ searchTerm: value });
    };

    return (
        <InputBase
            sx={(theme) => ({
                px: 1,
                width: 250,
                height: 37,
                margin: 'auto',
                ...theme.filter
            })}
            value={input}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'search' }}
            placeholder="Search…"
            endAdornment={<CloseIcon fontSize="small" onClick={reset} />}
        />
    );
}
