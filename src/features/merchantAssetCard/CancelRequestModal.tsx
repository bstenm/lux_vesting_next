'use client';

import Stack from '@mui/material/Stack';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { LightButton } from 'components/buttons/LightButton';
import { YellowButton } from 'components/buttons/YellowButton';
import { ButtonWithModal } from 'components/ButtonWithModal';

type Props = {
    title: string;
    textId: string;
    opened?: boolean;
    children: (handleClose: () => void) => React.ReactNode;
    processing: boolean;
    onConfirm: (handleClose?: () => void) => void;
};

export function CancelRequestModal({
    title,
    textId,
    opened,
    children,
    onConfirm,
    processing
}: Props): JSX.Element {
    return (
        <ButtonWithModal title={title} button={children} opened={opened}>
            {(handleClose) => (
                <Stack spacing={2}>
                    <Typography textId={textId} />
                    <Row justifyContent="space-between">
                        <LightButton
                            textId="cancel"
                            onClick={handleClose}
                            disabled={processing}
                        />
                        <YellowButton
                            textId="confirmRequestCancellation"
                            loading={processing}
                            onClick={async () => {
                                await onConfirm();
                                handleClose();
                            }}
                        />
                    </Row>
                </Stack>
            )}
        </ButtonWithModal>
    );
}
