'use client';

import { grey } from '@mui/material/colors';
import { Stack } from '@mui/material';
import { Trans } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import { Row } from '@/components/Row';
import { Spinner } from '@/components/Spinner';
import { getUserId } from '@/state/user/selectors';
import { formatDate } from '@/libs/utils';
import { Typography } from '@/components/Typography';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { defaultCurrencySymbol } from '@/config';
import { NotificationItem, StatusChangeNotificationData } from '@/config/types';

import { useDeleteNotification } from './useDeleteNotification';
import { NotificationLinkButton } from './NotificationLinkButton';
import { DeleteNotificationButton } from './DeleteNotificationButton';

type Props = {
    data: NotificationItem;
    onEmpty: () => void;
};

export function Notification({ data, onEmpty }: Props): JSX.Element {
    const uid = useAppSelector(getUserId);

    const theme = useTheme();

    const { id, link } = data;

    const [deleteNotification, deleting] = useDeleteNotification({
        onSuccess: onEmpty
    });

    const color =
        {
            denied: theme.palette.error.main,
            pending: theme.palette.info.main,
            revoked: theme.palette.error.main,
            approved: theme.palette.success.main,
            unprocessed: theme.palette.info.main
        }[(data as StatusChangeNotificationData).value] ??
        theme.palette.info.main;

    return (
        <Row
            sx={{
                py: 2,
                px: 4,
                bgcolor: '#151515',
                borderRadius: 1
            }}
            spacing={4}>
            <Stack spacing={0.5}>
                <Row alignItems="center" justifyContent="space-between">
                    <Trans
                        values={{
                            ...data,
                            currency: defaultCurrencySymbol
                        }}
                        i18nKey={data.type}
                        components={{
                            type: (
                                <Typography
                                    sx={{
                                        color,
                                        fontSize: 15
                                    }}
                                    bold
                                />
                            ),
                            value: <Typography bold sx={{ fontSize: 14 }} />
                        }}
                    />
                    <Typography italic sx={{ color: grey[600], fontSize: 14 }}>
                        {formatDate(data.createdAt)}
                    </Typography>
                </Row>
                <Typography sx={{ color: 'primary.main' }} variant="body2">
                    {data.assetName}
                </Typography>
            </Stack>
            <Row alignItems="flex-start">
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
