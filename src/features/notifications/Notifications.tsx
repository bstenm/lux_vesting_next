'use client';

import Stack, { StackProps } from '@mui/material/Stack';

import { Row } from 'components/Row';
import { NotificationItem } from 'config/types';

import { NotificationContent } from './NotificationContent';
import { NotificationLinkButton } from './NotificationLinkButton';
import { DeleteNotificationButton } from './DeleteNotificationButton';

type Props = StackProps & {
    data: NotificationItem[];
    deleteNotification: (id: string) => void;
};

export function Notifications({
    data,
    deleteNotification,
    ...props
}: Props): JSX.Element {
    return (
        <Stack {...props}>
            {data.map((notification) => (
                <Row key={notification.id} justifyContent="space-between">
                    <NotificationContent data={notification} />
                    <Row>
                        {notification.link && (
                            <NotificationLinkButton link={notification.link} />
                        )}
                        <DeleteNotificationButton
                            onClick={() => {
                                deleteNotification(notification.id);
                            }}
                        />
                    </Row>
                </Row>
            ))}
        </Stack>
    );
}
