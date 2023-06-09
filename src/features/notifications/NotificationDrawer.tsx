'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';

import { getUserId } from 'state/user/selectors';
import { StandardDrawer } from 'components/StandardDrawer';
import { useAppSelector } from 'libs/hooks/useAppSelector';

import { Notifications } from './Notifications';
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

    return (
        <Box>
            <OpenNotificationsButton
                onClick={toggleOpen}
                nbOfNotifications={userNotifications.length}
            />
            {open && (
                <StandardDrawer
                    open={open}
                    noData={!userNotifications.length}
                    onClose={toggleOpen}
                    transparent={!!userNotifications.length}
                    noDataMessage="noNotifications">
                    <Notifications sx={{ mt: 4 }} data={userNotifications} />
                </StandardDrawer>
            )}
        </Box>
    );
}
