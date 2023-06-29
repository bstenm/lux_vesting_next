'use client';

import { Typography } from '@/components/Typography';

export function NoFilesUploadedMessage(): JSX.Element {
    return (
        <Typography
            capitalized
            sx={{ m: 'auto' }}
            color="primary.light"
            textId="noDocumentsUploaded"
            fontSize={24}
        />
    );
}
