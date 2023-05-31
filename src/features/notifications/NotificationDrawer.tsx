'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';

import { StandardDrawer } from 'components/StandardDrawer';

import { Notifications } from './Notifications';
import { OpenNotificationsButton } from './OpenNotificationsButton';
import { useCurrentUserNotifications } from './useCurrentUserNotifications';

export function NotificationDrawer(): JSX.Element {
    const [open, setOpen] = useState(false);

    const { userNotifications, deleteUserNotification } =
        useCurrentUserNotifications({
            silent: true
        });

    const toggleOpen = (): void => {
        setOpen(!open);
    };

    return (
        <Box>
            <OpenNotificationsButton
                onClick={toggleOpen}
                nbOfNotifications={userNotifications.length}
            />
            {open && (
                <StandardDrawer
                    open={open}
                    onClose={toggleOpen}
                    noData={!userNotifications?.length}
                    noDataMessage="noNotifications">
                    <Notifications
                        sx={{ mt: 4 }}
                        data={userNotifications}
                        deleteNotification={deleteUserNotification}
                    />
                </StandardDrawer>
            )}
        </Box>
    );
}
