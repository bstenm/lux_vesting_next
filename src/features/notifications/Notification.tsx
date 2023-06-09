'use client';

import { Row } from 'components/Row';
import { Spinner } from 'components/Spinner';
import { getUserId } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { NotificationItem } from 'config/types';

import { NotificationContent } from './NotificationContent';
import { useDeleteNotification } from './useDeleteNotification';
import { NotificationLinkButton } from './NotificationLinkButton';
import { DeleteNotificationButton } from './DeleteNotificationButton';

type Props = {
    data: NotificationItem;
};

export function Notification({ data }: Props): JSX.Element {
    const uid = useAppSelector(getUserId);

    const { id, link } = data;

    const [deleteNotification, deleting] = useDeleteNotification();

    return (
        <Row justifyContent="space-between">
            <NotificationContent data={data} />
            <Row>
                {link && <NotificationLinkButton link={link} />}
                {deleting ? (
                    <Spinner />
                ) : (
                    <DeleteNotificationButton
                        onClick={() => {
                            deleteNotification({
                                id,
                                uid
                            });
                        }}
                    />
                )}
            </Row>
        </Row>
    );
}
