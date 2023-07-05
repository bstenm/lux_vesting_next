'use client';

import Stack from '@mui/material/Stack';
import { FormProvider } from 'react-hook-form';

import { Row } from '@/components/Row';
import { DarkButton } from '@/components/buttons/DarkButton';
import { GreenButton } from '@/components/buttons/GreenButton';
import { CustomTextField } from '@/components/CustomTextField';
import { AssetListingFormInput } from '@/config/types/asset';

import { AssetNameInput } from './AssetNameInput';
import { useEditAssetDataModal } from './useEditAssetDataModal';

type Props = {
    assetId: string;
    onSuccess: () => void;
};

export function EditAssetListingDataForm({
    assetId,
    onSuccess
}: Props): JSX.Element {
    const { onClose, onSubmit, submitting, formMethods } =
        useEditAssetDataModal(assetId, onSuccess);

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <AssetNameInput disabled={submitting} />
                    <Row spacing={3}>
                        <CustomTextField<AssetListingFormInput>
                            required
                            type="amount"
                            name="price"
                            disabled={submitting}
                            maxLength={9}
                        />
                        <CustomTextField<AssetListingFormInput>
                            required
                            name="color"
                            disabled={submitting}
                            maxLength={20}
                        />
                        <CustomTextField<AssetListingFormInput>
                            required
                            name="material"
                            disabled={submitting}
                            maxLength={20}
                        />
                    </Row>
                    <CustomTextField<AssetListingFormInput>
                        rows={5}
                        label="assetDescription"
                        name="description"
                        disabled={submitting}
                        maxLength={500}
                        multiline
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
