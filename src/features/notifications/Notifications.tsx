'use client';

import Stack, { StackProps } from '@mui/material/Stack';

import { Row } from 'components/Row';
import { Spinner } from 'components/Spinner';
import { getUserId } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { NotificationItem } from 'config/types';

import { NotificationContent } from './NotificationContent';
import { useDeleteNotification } from './useDeleteNotification';
import { NotificationLinkButton } from './NotificationLinkButton';
import { DeleteNotificationButton } from './DeleteNotificationButton';

type Props = StackProps & {
    data: NotificationItem[];
};

export function Notifications({ data, ...props }: Props): JSX.Element {
    const uid = useAppSelector(getUserId);

    const [deleteNotification, deleting] = useDeleteNotification();

    return (
        <Stack {...props}>
            {data.map((notification) => (
                <Row key={notification.id} justifyContent="space-between">
                    <NotificationContent data={notification} />
                    <Row>
                        {notification.link && (
                            <NotificationLinkButton link={notification.link} />
                        )}
                        {deleting ? (
                            <Spinner />
                        ) : (
                            <DeleteNotificationButton
                                onClick={() => {
                                    deleteNotification({
                                        id: notification.id,
                                        uid
                                    });
                                }}
                            />
                        )}
                    </Row>
                </Row>
            ))}
        </Stack>
    );
}
