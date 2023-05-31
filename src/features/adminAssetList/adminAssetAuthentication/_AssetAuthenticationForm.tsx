'use client';

import FormGroup from '@mui/material/FormGroup';
import { FormProvider } from 'react-hook-form';

import { Row } from 'components/Row';
import { Checkbox } from 'components/Checkbox';
import { DataPoint } from 'components/DataPoint';
import { GreenButton } from 'components/buttons/GreenButton';
import { AssetItem, AssetAuthenticationStatus } from 'config/types/asset';
import { useUpdateAssetAuthenticationStatus } from 'hooks/_useUpdateAssetAuthenticationStatus';

import { DenyButton } from '../DenyButton';

type Props = {
    data: AssetItem;
};

export function AssetAuthenticationForm({ data }: Props): JSX.Element {
    const {
        id,
        merchantId,
        physicallyChecked,
        physicallyReceived,
        authenticationStatus,
        physicallyCheckedAt,
        physicallyReceivedAt
    } = data;

    const [updateStatus, updating] = useUpdateAssetAuthenticationStatus(
        id,
        merchantId,
        handleClose
    );

    const actionButton: Record<AssetAuthenticationStatus, JSX.Element> = {
        denied: (
            <GreenButton
                fullWidth
                textId="approve"
                onClick={() => updateStatus('approved')}
                loading={updating}
            />
        ),
        pending: (
            <Row spacing={3}>
                <DenyButton
                    assetId={data.id}
                    disabled={updating}
                    statusType="authenticationStatus"
                />
                <GreenButton
                    fullWidth
                    textId="approve"
                    onClick={() => updateStatus('approved')}
                    loading={updating}
                />
            </Row>
        ),
        approved: (
            <DenyButton
                textId="revokeAuthentication"
                assetId={data.id}
                disabled={updating}
                statusType="authenticationStatus"
            />
        ),
        unprocessed: <div />
    };

    return (
        <FormProvider {...formMethods}>
            <FormGroup>
                <Row>
                    <Checkbox
                        textId={
                            data.physicallyReceived
                                ? 'itemReceivedOn'
                                : 'itemReceived'
                        }
                        defaultChecked={physicallyReceived}
                    />
                    {physicallyReceived && (
                        <DataPoint
                            color="primary.light"
                            data={physicallyReceivedAt}
                        />
                    )}
                </Row>
                <Row>
                    <Checkbox
                        textId={
                            physicallyChecked ? 'itemCheckedOn' : 'itemChecked'
                        }
                        defaultChecked={physicallyChecked}
                    />
                    {physicallyReceived && (
                        <DataPoint
                            color="primary.light"
                            data={physicallyCheckedAt}
                        />
                    )}
                </Row>
            </FormGroup>
            {actionButton[authenticationStatus]}
        </FormProvider>
    );
}
