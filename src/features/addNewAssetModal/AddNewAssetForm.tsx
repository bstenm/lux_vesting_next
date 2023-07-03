'use client';

import Stack from '@mui/material/Stack';
import { FormProvider } from 'react-hook-form';

import { Row } from '@/components/Row';
import { DarkButton } from '@/components/buttons/DarkButton';
import { GreenButton } from '@/components/buttons/GreenButton';
import { DropFileAreaWithPreview } from '@/features/dropFileArea/DropFileAreaWithPreview';

import { useAddNewAssetModal } from './useAddNewAssetModal';
import { AssetNameInput } from '../editAssetListingDataForm/AssetNameInput';

type Props = {
    onSuccess: () => void;
};

export function AddNewAssetForm({ onSuccess }: Props): JSX.Element {
    const { onClose, onSubmit, submitting, formMethods } =
        useAddNewAssetModal(onSuccess);

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack sx={{ mb: 2 }} spacing={4}>
                    <AssetNameInput disabled={submitting} />
                    <DropFileAreaWithPreview
                        textId="uploadCoverPhoto"
                        fileType="picture"
                        fieldName="picture"
                        disabled={submitting}
                        required
                    />
                    <Row justifyContent="space-between">
                        <DarkButton
                            textId="cancel"
                            onClick={onClose}
                            disabled={submitting}
                        />
                        <GreenButton
                            type="submit"
                            textId="submit"
                            loading={submitting}
                        />
                    </Row>
                </Stack>
            </form>
        </FormProvider>
    );
}
