'use client';

import Box from '@mui/material/Box';

import { TextInput } from 'components/TextInput';

type Props = {
    disabled: boolean;
};

export function AssetNameInput({ disabled }: Props): JSX.Element {
    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                bgcolor: 'common.black'
            }}>
            <TextInput
                sx={{
                    p: 1,
                    '& .MuiInput-underline:before': {
                        borderBottomWidth: 0
                    }
                }}
                required
                autoFocus
                name="name"
                disabled={disabled}
                placeholder="assetName"
                inputProps={{
                    sx: { textAlign: 'center', textTransform: 'uppercase' }
                }}
            />
        </Box>
    );
}
