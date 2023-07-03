'use client';

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
                <AssetNameInput disabled={submitting} />
                <Row sx={{ mt: 4 }} spacing={3}>
                    <CustomTextField<AssetListingFormInput>
                        required
                        type="number"
                        name="price"
                        width="600px"
                        disabled={submitting}
                    />
                    <CustomTextField<AssetListingFormInput>
                        required
                        type="number"
                        name="wristLength"
                        disabled={submitting}
                    />
                    <CustomTextField<AssetListingFormInput>
                        required
                        name="color"
                        width="600px"
                        disabled={submitting}
                    />
                    <CustomTextField<AssetListingFormInput>
                        required
                        name="material"
                        disabled={submitting}
                    />
                </Row>
                <CustomTextField<AssetListingFormInput>
                    rows={5}
                    label="assetDescription"
                    name="description"
                    disabled={submitting}
                    multiline
                    required
                />
                <Row sx={{ mt: 2 }} justifyContent="space-between">
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
            </form>
        </FormProvider>
    );
}
