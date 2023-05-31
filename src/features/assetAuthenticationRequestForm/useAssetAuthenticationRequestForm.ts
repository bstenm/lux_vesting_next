'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn, SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { logger } from 'libs/logger';
import { getUserData } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { useUpdateUserData } from 'libs/hooks/useUpdateUserData';
import { useAddMediaToAsset } from 'features/dropFileArea/useAddMediaToAsset';
import { useUpdateAssetStatus } from 'libs/hooks/useUpdateAssetStatus';
import { isValidDocumentFileType } from 'libs/utils';
import { MediaType, AssetAuthenticationFormInput } from 'config/types/asset';

type StateLogic = {
    onClose: () => void;
    onSubmit: (data: AssetAuthenticationFormInput) => void;
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<AssetAuthenticationFormInput, object>;
};

export const assetAuthenticationFormSchema = yup
    .object({
        address: yup.string().required().min(2).max(150).trim(),
        certificateOfAuthenticityFile: yup
            .mixed()
            .test(
                'file_type_validation',
                'Invalid file type',
                isValidDocumentFileType
            )
    })
    .required();

export const useAssetAuthenticationRequestForm = (
    assetId: string,
    handleClose: () => void
): StateLogic => {
    const userData = useAppSelector(getUserData);

    const [addNewMedia] = useAddMediaToAsset(assetId, { silent: true });

    const [updateUserData] = useUpdateUserData({ silent: true });

    const [upateAssetStatus] = useUpdateAssetStatus(
        assetId,
        // The user account is their id
        userData.account,
        'authentication'
    );

    const formMethods = useForm<AssetAuthenticationFormInput>({
        resolver: yupResolver(assetAuthenticationFormSchema),
        defaultValues: {
            address: userData.address || ''
        }
    });

    const onClose = (): void => {
        formMethods.reset();
        handleClose();
    };

    const action: SubmitHandler<AssetAuthenticationFormInput> = async (
        data
    ): Promise<void> => {
        logger('Submitting asset authentication data').info(data);
        const { certificateOfAuthenticityFile: file, ...shippingData } = data;
        // Save the certificate and retrieve the uri pointing to it
        const title = 'certificateOfAuthenticity';
        const type: MediaType = 'document';
        if (file) await addNewMedia({ name: file.name, type, title, file });
        // Save data relevant to user (shipping address)
        await updateUserData(shippingData);
        // Save data relevant to asset
        await upateAssetStatus('pending');
        handleClose();
    };

    const [onSubmit, submitting] = useAsyncAction<
        AssetAuthenticationFormInput,
        void
    >(action, { error: 'errorUpdatingData' });

    return { onClose, onSubmit, submitting, formMethods };
};
