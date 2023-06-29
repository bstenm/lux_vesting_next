'use client';

import { MouseEvent } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    nbOfNotifications: number;
};

export function OpenNotificationsButton({
    onClick,
    nbOfNotifications
}: Props): JSX.Element {
    return (
        <IconButton onClick={onClick}>
            <Badge color="error" badgeContent={nbOfNotifications}>
                <NotificationsIcon sx={{ color: 'primary.light' }} />
            </Badge>
        </IconButton>
    );
}
