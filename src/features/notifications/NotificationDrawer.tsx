'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { getUserId } from '@/state/user/selectors';
import { StandardDrawer } from '@/components/StandardDrawer';
import { useAppSelector } from '@/libs/hooks/useAppSelector';

import { Notification } from './Notification';
import { useFetchNotifications } from './useFetchNotifications';
import { OpenNotificationsButton } from './OpenNotificationsButton';

export function NotificationDrawer(): JSX.Element {
    const uid = useAppSelector(getUserId);

    const [open, setOpen] = useState(false);

    const [userNotifications] = useFetchNotifications(uid, {
        silent: true
    });

    const toggleOpen = (): void => {
        setOpen(!open);
    };

    const nbOfNotification = userNotifications?.length;

    return (
        <Box>
            <OpenNotificationsButton
                onClick={toggleOpen}
                nbOfNotifications={nbOfNotification}
            />
            {open && (
                <StandardDrawer
                    open={open}
                    noData={!nbOfNotification}
                    onClose={toggleOpen}
                    transparent={!!nbOfNotification}
                    noDataMessage="noNotifications">
                    <Stack sx={{ mt: 4 }}>
                        {userNotifications.map((notification) => (
                            <Notification
                                key={notification.id}
                                data={notification}
                            />
                        ))}
                    </Stack>
                </StandardDrawer>
            )}
        </Box>
    );
}
