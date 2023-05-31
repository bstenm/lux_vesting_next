'use client';

import { Row } from 'components/Row';
import { LightButton } from 'components/buttons/LightButton';
import { GreenButton } from 'components/buttons/GreenButton';
import { useUpdateAssetStatus } from 'libs/hooks/useUpdateAssetStatus';
import { DenialNotesModalButton } from 'features/denialNotes/DenialNotesModalButton';
import { AssetAuthenticationStatus, AssetItem } from 'config/types/asset';

import { DenyButton } from '../DenyButton';

type Props = {
    data: AssetItem;
    handleClose: () => void;
};

export const AdminAssetAuthenticationStatusControlButtons = ({
    data,
    handleClose
}: Props): JSX.Element => {
    const { id, name, merchantId, authentication } = data;

    const allStepsCompleted =
        data.physicallyChecked &&
        data.physicallyReceived &&
        data.documentationChecked;

    const [updateStatus, updating] = useUpdateAssetStatus(
        id,
        merchantId,
        'authentication',
        { onSuccess: handleClose }
    );

    function DoneButton(): JSX.Element {
        return (
            <LightButton
                fullWidth
                textId="done"
                onClick={handleClose}
                disabled={updating}
            />
        );
    }

    function ApproveButton(): JSX.Element {
        return (
            <GreenButton
                fullWidth
                textId="approve"
                onClick={() => updateStatus('approved')}
                loading={updating}
            />
        );
    }

    function RejectButton(): JSX.Element {
        return (
            <DenyButton
                assetId={id}
                onDone={handleClose}
                disabled={updating}
                statusType="authentication"
            />
        );
    }

    const actionButton: Record<AssetAuthenticationStatus, JSX.Element> = {
        denied: (
            <Row spacing={3}>
                <DenialNotesModalButton title={name} disabled={updating} />
                {!allStepsCompleted ? <DoneButton /> : <ApproveButton />}
            </Row>
        ),
        pending: (
            <Row spacing={3}>
                <RejectButton />
                {!allStepsCompleted ? <DoneButton /> : <ApproveButton />}
            </Row>
        ),
        approved: <RejectButton />,
        unprocessed: <div />
    };

    return actionButton[authentication.status as AssetAuthenticationStatus];
};
