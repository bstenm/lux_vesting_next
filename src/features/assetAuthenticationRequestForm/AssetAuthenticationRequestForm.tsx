'use client';

import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import { FormProvider } from 'react-hook-form';

import { Row } from 'components/Row';
import { Checkbox } from 'components/Checkbox';
import { DarkButton } from 'components/buttons/DarkButton';
import { LightDivider } from 'components/LightDivider';
import { GreenButton } from 'components/buttons/GreenButton';
import { CertificateFileInput } from 'features/dropFileArea/CertificateFileInput';

import { ManualAddress } from './ManualAddress';
import { AddressAutocompleteInput } from './AddressAutocompleteInput';
import { useAssetAuthenticationRequestForm } from './useAssetAuthenticationRequestForm';

type Props = {
    assetId: string;
    onSuccess: () => void;
};

export function AssetAuthenticationRequestForm({
    assetId,
    onSuccess
}: Props): JSX.Element {
    const [noDocument, setNoDocument] = useState<boolean>(false);

    const [manualAddress, setManualAddress] = useState<boolean>(false);

    const onNoDocumentChange = (): void => {
        setNoDocument(!noDocument);
    };

    const onManualAddressChange = (): void => {
        setManualAddress(!manualAddress);
    };

    const { onClose, onSubmit, submitting, formMethods } =
        useAssetAuthenticationRequestForm(assetId, onSuccess);

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack sx={{ mt: 2 }} spacing={1}>
                    {!noDocument && (
                        <Box sx={{ pb: 1 }}>
                            <CertificateFileInput disabled={submitting} />
                        </Box>
                    )}
                    <Checkbox
                        size="small"
                        textId="noDocument"
                        checked={noDocument}
                        onChange={onNoDocumentChange}
                    />
                    <Box sx={{ py: 1 }}>
                        <LightDivider
                            sx={{ m: 'auto', width: 50, opacity: 0.4 }}
                        />
                    </Box>
                    {!manualAddress ? (
                        <AddressAutocompleteInput disabled={submitting} />
                    ) : (
                        <ManualAddress disabled={submitting} />
                    )}
                </Stack>
                <Row sx={{ mt: 4 }} justifyContent="space-between">
                    <DarkButton
                        textId="cancel"
                        onClick={onClose}
                        disabled={submitting}
                    />
                    <GreenButton
                        type="submit"
                        textId="requestAuth"
                        loading={submitting}
                    />
                </Row>
            </form>
        </FormProvider>
    );
}