'use client';

import { Trans } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import {
    NotificationItem,
    NewBidNotificationData,
    StatusChangeNotificationData
} from 'config/types';
import { Row } from 'components/Row';
import { Spinner } from 'components/Spinner';
import { formatDate } from 'libs/utils';
import { Typography } from 'components/Typography';
import { useFetchAssetData } from 'libs/hooks/useFetchAssetData';

import { defaultCurrencySymbol } from 'config';
import { NotificationInfo } from './NotificationInfo';
import { NotificationDate } from './NotificationDate';
import { NotificationValue } from './NotificationValue';

type Props = {
    data: NotificationItem;
};

export function NotificationContent({ data }: Props): JSX.Element {
    const theme = useTheme();

    const [assetData, fetching] = useFetchAssetData(data.assetId);

    const color =
        {
            denied: theme.palette.error.main,
            pending: theme.palette.info.main,
            revoked: theme.palette.error.main,
            approved: theme.palette.success.main,
            unprocessed: theme.palette.info.main
        }[(data as StatusChangeNotificationData).value] ??
        theme.palette.info.main;

    if (fetching) {
        return <Spinner />;
    }

    return (
        <Row alignItems="center">
            <Typography sx={{ p: 1, color: 'common.white' }}>
                <Trans
                    shouldUnescape
                    values={{
                        ...data,
                        asset: assetData.name ?? data.assetId,
                        currency: defaultCurrencySymbol
                    }}
                    i18nKey={data.type}
                    components={{
                        type: <NotificationInfo color={color} />,
                        asset: (
                            <NotificationInfo
                                title={assetData.name}
                                color={theme.palette.primary.light}
                            />
                        ),
                        value: (
                            <NotificationValue
                                title={(
                                    data as
                                        | NewBidNotificationData
                                        | StatusChangeNotificationData
                                ).value.toString()}
                            />
                        )
                    }}
                />
            </Typography>
            <NotificationDate>{formatDate(data.createdAt)}</NotificationDate>
        </Row>
    );
}
