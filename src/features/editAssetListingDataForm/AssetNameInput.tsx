'use client';

import { TextInput } from '@/components/TextInput';

type Props = {
    disabled: boolean;
};

export function AssetNameInput({ disabled }: Props): JSX.Element {
    return (
        <TextInput
            sx={{
                p: 1,
                bgcolor: 'common.black',
                textAlign: 'center',
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
                sx: {
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }
            }}
        />
    );
}
