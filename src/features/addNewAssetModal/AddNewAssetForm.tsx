'use client';

import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';

import { Row } from 'components/Row';
import { TextInput } from 'components/TextInput';
import { DarkButton } from 'components/buttons/DarkButton';
import { LightButton } from 'components/buttons/LightButton';
import { DropFileAreaWithPreview } from 'features/dropFileArea/DropFileAreaWithPreview';

import { useAddNewAssetModal } from './useAddNewAssetModal';

type Props = {
    onSuccess: () => void;
};

export function AddNewAssetForm({ onSuccess }: Props): JSX.Element {
    const {
        onClose,
        onSubmit,
        submitting,
        fileDropped,
        formMethods,
        onFileDropped,
        onFileRemoved
    } = useAddNewAssetModal(onSuccess);

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack sx={{ my: 2 }} spacing={3}>
                    <TextInput
                        label="assetName"
                        name="name"
                        disabled={submitting}
                        required
                    />
                    <DropFileAreaWithPreview
                        textId="uploadCoverPhoto"
                        fileType="picture"
                        fieldName="picture"
                        onFileDropped={onFileDropped}
                        onFileRemoved={onFileRemoved}
                        disabled={submitting}
                    />
                    <Row justifyContent="space-between">
                        <DarkButton
                            textId="cancel"
                            onClick={onClose}
                            disabled={submitting}
                        />
                        <LightButton
                            type="submit"
                            textId="submit"
                            loading={submitting}
                            disabled={!fileDropped}
                        />
                    </Row>
                </Stack>
            </form>
        </FormProvider>
    );
}
