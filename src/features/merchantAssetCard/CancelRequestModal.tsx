'use client';

import Stack from '@mui/material/Stack';

import { Row } from '@/components/Row';
import { Typography } from '@/components/Typography';
import { LightButton } from '@/components/buttons/LightButton';
import { YellowButton } from '@/components/buttons/YellowButton';
import { ButtonWithModal } from '@/components/ButtonWithModal';

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
        <ButtonWithModal
            warning
            title={title}
            button={children}
            opened={opened}>
            {(handleClose) => (
                <Stack sx={{ mt: 3 }} spacing={5}>
                    <Typography
                        sx={{ lineHeight: 2.5 }}
                        textId={textId}
                        uppercased
                    />
                    <Row justifyContent="space-between">
                        <LightButton
                            textId="cancel"
                            onClick={handleClose}
                            disabled={processing}
                        />
                        <YellowButton
                            textId="confirm"
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
