'use client';

import { TextField } from '@/components/TextField';

type Props = {
    text: string;
    onChange: (text: string) => void;
};

export function ChatRoomInput({ text, onChange }: Props): JSX.Element {
    return (
        <TextField
            sx={{
                '& .MuiInput-underline:before': {
                    border: 0
                }
            }}
            autoFocus
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="typeYourMessage"
            inputProps={{
                sx: { color: 'common.white', width: 250 }
            }}
        />
    );
}
