'use client';

import IconButton from '@mui/material/IconButton';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { Spinner } from 'components/Spinner';

type Props = {
    submit: () => void;
    submitting: boolean;
};

export function ChatRoomSubmitButton({
    submit,
    submitting
}: Props): JSX.Element {
    return (
        <IconButton sx={{ bgcolor: 'primary.dark' }} onClick={submit}>
            {submitting ? (
                <Spinner />
            ) : (
                <ChevronRight sx={{ color: 'common.white' }} />
            )}
        </IconButton>
    );
}
