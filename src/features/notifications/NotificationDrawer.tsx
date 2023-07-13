'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { getUserId } from '@/state/user/selectors';
import { Typography } from '@/components/Typography';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { StandardDrawer } from '@/components/StandardDrawer';

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
                <StandardDrawer open={open} onClose={toggleOpen} transparent>
                    <Stack sx={{ mt: 4 }}>
                        {nbOfNotification < 1 ? (
                            <Box
                                sx={{
                                    bgcolor: '#151515',
                                    borderRadius: 1
                                }}>
                                <Typography
                                    capitalized
                                    sx={{ m: 2, color: 'text.secondary' }}
                                    textId="noNotifications"
                                    variant="body2"
                                />
                            </Box>
                        ) : (
                            userNotifications.map((notification) => (
                                <Notification
                                    key={notification.id}
                                    data={notification}
                                    onEmpty={toggleOpen}
                                />
                            ))
                        )}
                    </Stack>
                </StandardDrawer>
            )}
        </Box>
    );
}
