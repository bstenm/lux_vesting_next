'use client';

import Link from 'next/link';
import { grey } from '@mui/material/colors';
import ForwardIcon from '@mui/icons-material/Forward';

type Props = {
    link: string;
};

export function NotificationLinkButton({ link }: Props): JSX.Element {
    return (
        <Link to={link} style={{ height: 20 }}>
            <ForwardIcon
                sx={{
                    color: grey[700],
                    '&:hover': {
                        color: grey[500]
                    }
                }}
                fontSize="small"
            />
        </Link>
    );
}
